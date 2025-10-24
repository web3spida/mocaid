// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IRewardManager {
    function distributeCredentialReward(address user, string memory credentialType) external;
    function getUserRewards(address user) external view returns (uint256);
}

interface IVerifierRegistry {
    function isActiveVerifier(address verifier) external view returns (bool);
    function getVerifierReputation(address verifier) external view returns (uint256);
}

interface IAnalyticsModule {
    function updateUserStats(address user, uint256 credentialCount, uint256 totalRewards, uint256 reputationPoints) external;
    function updateGlobalStats(uint256 totalCredentials, uint256 totalRewardsDistributed, uint256 totalFeesCollected) external;
}

/**
 * @title CredentialRegistry
 * @dev Central registry for managing credentials with integrated rewards and verification
 */
contract CredentialRegistry is Ownable, ReentrancyGuard {
    
    struct Credential {
        address issuer;
        address holder;
        string credentialHash;
        string credentialType;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isRevoked;
        bool isVerified;
        address verifier;
        uint256 verifiedAt;
        uint256 rewardAmount;
        bool exists;
    }
    
    struct UserProfile {
        uint256 totalCredentials;
        uint256 totalRewards;
        uint256 reputationPoints;
        uint256 lastActivity;
        bool isActive;
    }
    
    // State variables
    mapping(string => Credential) public credentials;
    mapping(address => string[]) public userCredentials;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public authorizedIssuers;
    mapping(string => uint256) public credentialTypeCounts;
    mapping(string => uint256) public credentialTypeRewards;
    
    string[] public allCredentials;
    string[] public credentialTypes;
    uint256 public totalCredentials;
    uint256 public totalUsers;
    
    // Integration contracts
    IRewardManager public rewardManager;
    IVerifierRegistry public verifierRegistry;
    IAnalyticsModule public analyticsModule;
    
    // Configuration
    uint256 public baseReputationPoints = 10;
    uint256 public verificationBonusPoints = 5;
    
    // Events
    event CredentialRegistered(
        address indexed issuer,
        address indexed holder,
        string credentialHash,
        string credentialType,
        uint256 issuedAt,
        uint256 rewardAmount
    );
    event CredentialVerified(
        address indexed verifier,
        string credentialHash,
        uint256 verifiedAt,
        uint256 bonusReward
    );
    event CredentialRevoked(
        address indexed issuer,
        string credentialHash,
        uint256 revokedAt
    );
    event UserProfileUpdated(
        address indexed user,
        uint256 totalCredentials,
        uint256 totalRewards,
        uint256 reputationPoints
    );
    event IssuerAuthorized(address indexed issuer, uint256 authorizedAt);
    event IssuerRevoked(address indexed issuer, uint256 revokedAt);
    event ContractIntegrationUpdated(string contractType, address contractAddress);
    
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender] || msg.sender == owner(), "Not authorized issuer");
        _;
    }
    
    modifier onlyActiveVerifier() {
        require(
            address(verifierRegistry) != address(0) && 
            verifierRegistry.isActiveVerifier(msg.sender),
            "Not active verifier"
        );
        _;
    }
    
    modifier credentialExists(string memory credentialHash) {
        require(credentials[credentialHash].exists, "Credential does not exist");
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {
        authorizedIssuers[initialOwner] = true;
    }
    
    /**
     * @dev Set integration contract addresses
     */
    function setRewardManager(address _rewardManager) external onlyOwner {
        require(_rewardManager != address(0), "Invalid address");
        rewardManager = IRewardManager(_rewardManager);
        emit ContractIntegrationUpdated("RewardManager", _rewardManager);
    }
    
    function setVerifierRegistry(address _verifierRegistry) external onlyOwner {
        require(_verifierRegistry != address(0), "Invalid address");
        verifierRegistry = IVerifierRegistry(_verifierRegistry);
        emit ContractIntegrationUpdated("VerifierRegistry", _verifierRegistry);
    }
    
    function setAnalyticsModule(address _analyticsModule) external onlyOwner {
        require(_analyticsModule != address(0), "Invalid address");
        analyticsModule = IAnalyticsModule(_analyticsModule);
        emit ContractIntegrationUpdated("AnalyticsModule", _analyticsModule);
    }
    
    /**
     * @dev Authorize issuer
     */
    function authorizeIssuer(address issuer) external onlyOwner {
        require(!authorizedIssuers[issuer], "Already authorized");
        authorizedIssuers[issuer] = true;
        emit IssuerAuthorized(issuer, block.timestamp);
    }
    
    /**
     * @dev Revoke issuer authorization
     */
    function revokeIssuerAuthorization(address issuer) external onlyOwner {
        require(authorizedIssuers[issuer], "Not authorized");
        require(issuer != owner(), "Cannot revoke owner");
        authorizedIssuers[issuer] = false;
        emit IssuerRevoked(issuer, block.timestamp);
    }
    
    /**
     * @dev Register a new credential
     */
    function registerCredential(
        address holder,
        string memory credentialHash,
        string memory credentialType,
        uint256 expiresAt
    ) external nonReentrant onlyAuthorizedIssuer {
        require(holder != address(0), "Invalid holder address");
        require(bytes(credentialHash).length > 0, "Invalid credential hash");
        require(bytes(credentialType).length > 0, "Invalid credential type");
        require(!credentials[credentialHash].exists, "Credential already exists");
        
        if (expiresAt > 0) {
            require(expiresAt > block.timestamp, "Invalid expiration");
        }
        
        // Get reward amount from RewardManager
        uint256 rewardAmount = 0;
        if (address(rewardManager) != address(0)) {
            try rewardManager.distributeCredentialReward(holder, credentialType) {
                rewardAmount = rewardManager.getUserRewards(holder);
            } catch {
                // Continue without reward
            }
        }
        
        // Create credential
        credentials[credentialHash] = Credential({
            issuer: msg.sender,
            holder: holder,
            credentialHash: credentialHash,
            credentialType: credentialType,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            isRevoked: false,
            isVerified: false,
            verifier: address(0),
            verifiedAt: 0,
            rewardAmount: rewardAmount,
            exists: true
        });
        
        // Update user data
        userCredentials[holder].push(credentialHash);
        _updateUserProfile(holder);
        
        // Update global stats
        allCredentials.push(credentialHash);
        totalCredentials++;
        credentialTypeCounts[credentialType]++;
        credentialTypeRewards[credentialType] += rewardAmount;
        
        // Add credential type if new
        if (credentialTypeCounts[credentialType] == 1) {
            credentialTypes.push(credentialType);
        }
        
        // Update analytics
        _updateAnalytics();
        
        emit CredentialRegistered(
            msg.sender,
            holder,
            credentialHash,
            credentialType,
            block.timestamp,
            rewardAmount
        );
    }
    
    /**
     * @dev Verify a credential by an authorized verifier
     */
    function verifyCredential(string memory credentialHash) 
        external 
        nonReentrant 
        onlyActiveVerifier 
        credentialExists(credentialHash) 
        returns (bool) 
    {
        Credential storage cred = credentials[credentialHash];
        
        require(!cred.isRevoked, "Credential is revoked");
        require(!cred.isVerified, "Already verified");
        
        // Check expiration
        if (cred.expiresAt > 0 && block.timestamp > cred.expiresAt) {
            return false;
        }
        
        // Mark as verified
        cred.isVerified = true;
        cred.verifier = msg.sender;
        cred.verifiedAt = block.timestamp;
        
        // Calculate bonus reward
        uint256 bonusReward = 0;
        if (address(rewardManager) != address(0)) {
            // Bonus based on verifier reputation
            uint256 verifierReputation = verifierRegistry.getVerifierReputation(msg.sender);
            bonusReward = (cred.rewardAmount * verifierReputation) / 100; // Up to 100% bonus
            
            if (bonusReward > 0) {
                try rewardManager.distributeCredentialReward(cred.holder, "verification_bonus") {
                    cred.rewardAmount += bonusReward;
                } catch {
                    bonusReward = 0;
                }
            }
        }
        
        // Update user profile with verification bonus
        _updateUserProfile(cred.holder);
        
        // Update analytics
        _updateAnalytics();
        
        emit CredentialVerified(msg.sender, credentialHash, block.timestamp, bonusReward);
        
        return true;
    }
    
    /**
     * @dev Revoke a credential
     */
    function revokeCredential(string memory credentialHash) 
        external 
        nonReentrant 
        credentialExists(credentialHash) 
    {
        Credential storage cred = credentials[credentialHash];
        require(
            cred.issuer == msg.sender || msg.sender == owner(),
            "Not authorized to revoke"
        );
        require(!cred.isRevoked, "Already revoked");
        
        cred.isRevoked = true;
        
        // Update user profile
        _updateUserProfile(cred.holder);
        
        emit CredentialRevoked(msg.sender, credentialHash, block.timestamp);
    }
    
    /**
     * @dev Check if credential is valid
     */
    function isCredentialValid(string memory credentialHash) 
        external 
        view 
        returns (bool) 
    {
        if (!credentials[credentialHash].exists) {
            return false;
        }
        
        Credential memory cred = credentials[credentialHash];
        
        if (cred.isRevoked) {
            return false;
        }
        
        if (cred.expiresAt > 0 && block.timestamp > cred.expiresAt) {
            return false;
        }
        
        return true;
    }
    
    /**
     * @dev Get credential details
     */
    function getCredential(string memory credentialHash) 
        external 
        view 
        credentialExists(credentialHash) 
        returns (
            address issuer,
            address holder,
            string memory credentialType,
            uint256 issuedAt,
            uint256 expiresAt,
            bool isRevoked,
            bool isVerified,
            address verifier,
            uint256 rewardAmount
        ) 
    {
        Credential memory cred = credentials[credentialHash];
        return (
            cred.issuer,
            cred.holder,
            cred.credentialType,
            cred.issuedAt,
            cred.expiresAt,
            cred.isRevoked,
            cred.isVerified,
            cred.verifier,
            cred.rewardAmount
        );
    }
    
    /**
     * @dev Get user credentials
     */
    function getUserCredentials(address user) 
        external 
        view 
        returns (string[] memory) 
    {
        return userCredentials[user];
    }
    
    /**
     * @dev Get credential types
     */
    function getCredentialTypes() external view returns (string[] memory) {
        return credentialTypes;
    }
    
    /**
     * @dev Get credential type stats
     */
    function getCredentialTypeStats(string memory credentialType) 
        external 
        view 
        returns (uint256 count, uint256 totalRewards) 
    {
        return (credentialTypeCounts[credentialType], credentialTypeRewards[credentialType]);
    }
    
    /**
     * @dev Internal function to update user profile
     */
    function _updateUserProfile(address user) internal {
        string[] memory userCreds = userCredentials[user];
        uint256 totalRewards = 0;
        uint256 validCredentials = 0;
        
        for (uint256 i = 0; i < userCreds.length; i++) {
            Credential memory cred = credentials[userCreds[i]];
            if (!cred.isRevoked) {
                validCredentials++;
                totalRewards += cred.rewardAmount;
            }
        }
        
        uint256 reputationPoints = validCredentials * baseReputationPoints;
        
        // Add bonus for verified credentials
        for (uint256 i = 0; i < userCreds.length; i++) {
            if (credentials[userCreds[i]].isVerified && !credentials[userCreds[i]].isRevoked) {
                reputationPoints += verificationBonusPoints;
            }
        }
        
        // Update or create user profile
        if (!userProfiles[user].isActive && validCredentials > 0) {
            totalUsers++;
        }
        
        userProfiles[user] = UserProfile({
            totalCredentials: validCredentials,
            totalRewards: totalRewards,
            reputationPoints: reputationPoints,
            lastActivity: block.timestamp,
            isActive: validCredentials > 0
        });
        
        emit UserProfileUpdated(user, validCredentials, totalRewards, reputationPoints);
    }
    
    /**
     * @dev Internal function to update analytics
     */
    function _updateAnalytics() internal {
        if (address(analyticsModule) != address(0)) {
            try analyticsModule.updateGlobalStats(
                totalCredentials,
                0, // Will be updated by RewardManager
                0  // Will be updated by RewardManager
            ) {
                // Analytics updated
            } catch {
                // Continue if analytics fails
            }
        }
    }
    
    /**
     * @dev Update configuration
     */
    function updateConfiguration(
        uint256 _baseReputationPoints,
        uint256 _verificationBonusPoints
    ) external onlyOwner {
        baseReputationPoints = _baseReputationPoints;
        verificationBonusPoints = _verificationBonusPoints;
    }
}