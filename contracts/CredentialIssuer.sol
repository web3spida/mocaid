// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IRewardManager {
    function distributeCredentialReward(address user, string memory credentialType) external;
    function payVerifierFee(address verifier, string memory credentialType) external;
}

interface IAnalyticsModule {
    function updateUserStats(address user, uint256 credentialCount, uint256 totalRewards, uint256 reputationPoints) external;
    function updateVerifierStats(address verifier, uint256 verificationCount, uint256 totalFees, uint256 reputationScore) external;
    function updateCredentialTypeStats(string memory credentialType, uint256 count, uint256 totalRewards) external;
    function updateGlobalStats(uint256 totalCredentials, uint256 totalRewardsDistributed, uint256 totalFeesCollected) external;
}

/**
 * @title CredentialIssuer
 * @dev Manages the issuance, verification, and revocation of verifiable credentials with integrated rewards
 */
contract CredentialIssuer is Ownable, ReentrancyGuard {
    struct Credential {
        address issuer;
        address holder;
        string credentialHash;
        string credentialType;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isRevoked;
        bool exists;
    }

    mapping(string => Credential) public credentials;
    mapping(address => string[]) public holderCredentials;
    mapping(address => string[]) public issuerCredentials;
    mapping(address => bool) public authorizedIssuers;
    mapping(string => uint256) public credentialTypeCounts;
    
    string[] public allCredentials;
    uint256 public totalCredentials;
    
    // Integration contracts
    IRewardManager public rewardManager;
    IAnalyticsModule public analyticsModule;

    event CredentialIssued(
        address indexed issuer,
        address indexed holder,
        string credentialHash,
        string credentialType,
        uint256 issuedAt,
        uint256 expiresAt
    );
    
    event CredentialRevoked(
        address indexed issuer,
        string credentialHash,
        uint256 revokedAt
    );
    
    event CredentialVerified(address indexed verifier, string credentialHash, uint256 verifiedAt);
    event IssuerAuthorized(address indexed issuer, uint256 authorizedAt);
    event IssuerRevoked(address indexed issuer, uint256 revokedAt);
    event RewardManagerUpdated(address indexed newRewardManager);
    event AnalyticsModuleUpdated(address indexed newAnalyticsModule);

    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender] || msg.sender == owner(), "Not authorized issuer");
        _;
    }

    modifier credentialExists(string memory credentialHash) {
        require(credentials[credentialHash].exists, "Credential does not exist");
        _;
    }

    modifier onlyCredentialIssuer(string memory credentialHash) {
        require(
            credentials[credentialHash].issuer == msg.sender || msg.sender == owner(),
            "Not credential issuer"
        );
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
        // Owner is automatically an authorized issuer
        authorizedIssuers[initialOwner] = true;
    }

    /**
     * @dev Set the RewardManager contract address
     * @param _rewardManager Address of the RewardManager contract
     */
    function setRewardManager(address _rewardManager) external onlyOwner {
        require(_rewardManager != address(0), "Invalid reward manager address");
        rewardManager = IRewardManager(_rewardManager);
        emit RewardManagerUpdated(_rewardManager);
    }

    /**
     * @dev Set the AnalyticsModule contract address
     * @param _analyticsModule Address of the AnalyticsModule contract
     */
    function setAnalyticsModule(address _analyticsModule) external onlyOwner {
        require(_analyticsModule != address(0), "Invalid analytics module address");
        analyticsModule = IAnalyticsModule(_analyticsModule);
        emit AnalyticsModuleUpdated(_analyticsModule);
    }

    /**
     * @dev Authorize an address to issue credentials
     * @param issuer The address to authorize
     */
    function authorizeIssuer(address issuer) public onlyOwner {
        require(!authorizedIssuers[issuer], "Already authorized");
        authorizedIssuers[issuer] = true;
        emit IssuerAuthorized(issuer, block.timestamp);
    }

    /**
     * @dev Revoke issuer authorization
     * @param issuer The address to revoke
     */
    function revokeIssuerAuthorization(address issuer) public onlyOwner {
        require(authorizedIssuers[issuer], "Not authorized");
        require(issuer != owner(), "Cannot revoke owner");
        authorizedIssuers[issuer] = false;
        emit IssuerRevoked(issuer, block.timestamp);
    }

    /**
     * @dev Issue a new verifiable credential
     * @param to The address to issue the credential to
     * @param credentialHash The hash of the credential data
     * @param credentialType The type of credential (e.g., "education", "identity")
     * @param expiresAt Expiration timestamp (0 for non-expiring)
     */
    function issueCredential(
        address to,
        string memory credentialHash,
        string memory credentialType,
        uint256 expiresAt
    ) public nonReentrant onlyAuthorizedIssuer {
        require(to != address(0), "Invalid recipient address");
        require(bytes(credentialHash).length > 0, "Credential hash cannot be empty");
        require(bytes(credentialType).length > 0, "Credential type cannot be empty");
        require(!credentials[credentialHash].exists, "Credential already exists");
        
        if (expiresAt > 0) {
            require(expiresAt > block.timestamp, "Expiration must be in the future");
        }

        credentials[credentialHash] = Credential({
            issuer: msg.sender,
            holder: to,
            credentialHash: credentialHash,
            credentialType: credentialType,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            isRevoked: false,
            exists: true
        });

        holderCredentials[to].push(credentialHash);
        issuerCredentials[msg.sender].push(credentialHash);
        allCredentials.push(credentialHash);
        totalCredentials++;
        credentialTypeCounts[credentialType]++;

        // Distribute reward to credential holder if RewardManager is set
        if (address(rewardManager) != address(0)) {
            try rewardManager.distributeCredentialReward(to, credentialType) {
                // Reward distributed successfully
            } catch {
                // Continue even if reward distribution fails
            }
        }

        // Update analytics if AnalyticsModule is set
        if (address(analyticsModule) != address(0)) {
            try analyticsModule.updateCredentialTypeStats(
                credentialType, 
                credentialTypeCounts[credentialType], 
                0 // Total rewards will be tracked by RewardManager
            ) {
                // Analytics updated successfully
            } catch {
                // Continue even if analytics update fails
            }
            
            try analyticsModule.updateGlobalStats(
                totalCredentials,
                0, // Total rewards distributed (tracked by RewardManager)
                0  // Total fees collected (tracked by RewardManager)
            ) {
                // Global stats updated successfully
            } catch {
                // Continue even if global stats update fails
            }
        }

        emit CredentialIssued(
            msg.sender,
            to,
            credentialHash,
            credentialType,
            block.timestamp,
            expiresAt
        );
    }

    /**
     * @dev Verify a credential by a verifier (for Veyra Protocol)
     * @param credentialHash The credential hash to verify
     * @return isValid True if credential is valid and not revoked/expired
     */
    function verifyCredentialByVerifier(string memory credentialHash) 
        external 
        returns (bool isValid) 
    {
        isValid = verifyCredential(credentialHash);
        
        if (isValid) {
            // Pay verifier fee if RewardManager is set
            if (address(rewardManager) != address(0)) {
                try rewardManager.payVerifierFee(msg.sender, credentials[credentialHash].credentialType) {
                    // Fee paid successfully
                } catch {
                    // Continue even if fee payment fails
                }
            }
            
            emit CredentialVerified(msg.sender, credentialHash, block.timestamp);
        }
        
        return isValid;
    }

    /**
     * @dev Verify if a credential is valid (view function)
     * @param credentialHash The credential hash to verify
     * @return isValid True if credential is valid and not revoked/expired
     */
    function verifyCredential(string memory credentialHash) 
        public 
        view 
        returns (bool isValid) 
    {
        if (!credentials[credentialHash].exists) {
            return false;
        }

        Credential memory cred = credentials[credentialHash];
        
        // Check if revoked
        if (cred.isRevoked) {
            return false;
        }

        // Check if expired (0 means no expiration)
        if (cred.expiresAt > 0 && block.timestamp > cred.expiresAt) {
            return false;
        }

        return true;
    }

    /**
     * @dev Revoke a credential
     * @param credentialHash The credential hash to revoke
     */
    function revokeCredential(string memory credentialHash) 
        public 
        nonReentrant 
        credentialExists(credentialHash) 
        onlyCredentialIssuer(credentialHash) 
    {
        require(!credentials[credentialHash].isRevoked, "Credential already revoked");
        
        credentials[credentialHash].isRevoked = true;
        
        emit CredentialRevoked(msg.sender, credentialHash, block.timestamp);
    }

    /**
     * @dev Get credential details
     * @param credentialHash The credential hash to query
     * @return issuer The issuer address
     * @return holder The holder address
     * @return credentialType The credential type
     * @return issuedAt Issue timestamp
     * @return expiresAt Expiration timestamp
     * @return isRevoked Revocation status
     */
    function getCredential(string memory credentialHash) 
        public 
        view 
        credentialExists(credentialHash) 
        returns (
            address issuer,
            address holder,
            string memory credentialType,
            uint256 issuedAt,
            uint256 expiresAt,
            bool isRevoked
        ) 
    {
        Credential memory cred = credentials[credentialHash];
        return (
            cred.issuer,
            cred.holder,
            cred.credentialType,
            cred.issuedAt,
            cred.expiresAt,
            cred.isRevoked
        );
    }

    /**
     * @dev Get all credentials held by an address
     * @param holder The holder address
     * @return credentialHashes Array of credential hashes
     */
    function getHolderCredentials(address holder) 
        public 
        view 
        returns (string[] memory credentialHashes) 
    {
        return holderCredentials[holder];
    }

    /**
     * @dev Get all credentials issued by an address
     * @param issuer The issuer address
     * @return credentialHashes Array of credential hashes
     */
    function getIssuerCredentials(address issuer) 
        public 
        view 
        returns (string[] memory credentialHashes) 
    {
        return issuerCredentials[issuer];
    }

    /**
     * @dev Get paginated list of all credentials
     * @param offset Starting index
     * @param limit Maximum number of results
     * @return credentialHashes Array of credential hashes
     */
    function getAllCredentials(uint256 offset, uint256 limit) 
        public 
        view 
        returns (string[] memory credentialHashes) 
    {
        require(offset < allCredentials.length, "Offset out of bounds");
        
        uint256 end = offset + limit;
        if (end > allCredentials.length) {
            end = allCredentials.length;
        }
        
        credentialHashes = new string[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            credentialHashes[i - offset] = allCredentials[i];
        }
        
        return credentialHashes;
    }
}