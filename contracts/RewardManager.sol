// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title RewardManager
 * @dev Manages reward distribution for users and fee collection for verifiers in  Verya Protocol
 */
contract RewardManager is Ownable, ReentrancyGuard {
    
    struct UserRewards {
        uint256 totalRewards;
        uint256 reputationPoints;
        uint256 credentialCount;
        uint256 lastRewardTime;
    }
    
    struct VerifierFees {
        uint256 totalFees;
        uint256 verificationCount;
        uint256 lastFeeTime;
    }
    
    // State variables
    mapping(address => UserRewards) public userRewards;
    mapping(address => VerifierFees) public verifierFees;
    mapping(string => uint256) public credentialRewards; // credentialType => reward amount
    
    IERC20 public rewardToken; // MOCA token for rewards
    uint256 public baseReward = 100 * 10**18; // 100 MOCA base reward
    uint256 public verifierFee = 10 * 10**18; // 10 MOCA verifier fee
    uint256 public reputationMultiplier = 10; // 10 reputation points per credential
    
    // Events
    event RewardDistributed(address indexed user, uint256 amount, uint256 reputationPoints, string credentialType);
    event VerifierFeePaid(address indexed verifier, uint256 amount, string credentialHash);
    event RewardConfigUpdated(uint256 baseReward, uint256 verifierFee, uint256 reputationMultiplier);
    event CredentialRewardSet(string credentialType, uint256 rewardAmount);
    
    constructor(address _rewardToken) Ownable(msg.sender) {
        rewardToken = IERC20(_rewardToken);
    }
    
    /**
     * @dev Distribute rewards to user for verified credential
     * @param user Address of the user receiving rewards
     * @param credentialType Type of credential verified
     */
    function distributeReward(address user, string memory credentialType) external onlyOwner nonReentrant {
        require(user != address(0), "Invalid user address");
        
        uint256 rewardAmount = credentialRewards[credentialType] > 0 
            ? credentialRewards[credentialType] 
            : baseReward;
        
        uint256 reputationPoints = reputationMultiplier;
        
        // Update user rewards
        userRewards[user].totalRewards += rewardAmount;
        userRewards[user].reputationPoints += reputationPoints;
        userRewards[user].credentialCount += 1;
        userRewards[user].lastRewardTime = block.timestamp;
        
        // Transfer reward tokens
        require(rewardToken.transfer(user, rewardAmount), "Reward transfer failed");
        
        emit RewardDistributed(user, rewardAmount, reputationPoints, credentialType);
    }
    
    /**
     * @dev Pay fee to verifier for credential verification
     * @param verifier Address of the verifier
     * @param credentialHash Hash of the verified credential
     */
    function payVerifierFee(address verifier, string memory credentialHash) external onlyOwner nonReentrant {
        require(verifier != address(0), "Invalid verifier address");
        
        // Update verifier fees
        verifierFees[verifier].totalFees += verifierFee;
        verifierFees[verifier].verificationCount += 1;
        verifierFees[verifier].lastFeeTime = block.timestamp;
        
        // Transfer fee to verifier
        require(rewardToken.transfer(verifier, verifierFee), "Fee transfer failed");
        
        emit VerifierFeePaid(verifier, verifierFee, credentialHash);
    }
    
    /**
     * @dev Set reward amount for specific credential type
     * @param credentialType Type of credential
     * @param rewardAmount Reward amount in tokens
     */
    function setCredentialReward(string memory credentialType, uint256 rewardAmount) external onlyOwner {
        credentialRewards[credentialType] = rewardAmount;
        emit CredentialRewardSet(credentialType, rewardAmount);
    }
    
    /**
     * @dev Update reward configuration
     * @param _baseReward New base reward amount
     * @param _verifierFee New verifier fee amount
     * @param _reputationMultiplier New reputation multiplier
     */
    function updateRewardConfig(
        uint256 _baseReward,
        uint256 _verifierFee,
        uint256 _reputationMultiplier
    ) external onlyOwner {
        baseReward = _baseReward;
        verifierFee = _verifierFee;
        reputationMultiplier = _reputationMultiplier;
        
        emit RewardConfigUpdated(_baseReward, _verifierFee, _reputationMultiplier);
    }
    
    /**
     * @dev Get user reward information
     * @param user Address of the user
     * @return totalRewards Total rewards earned
     * @return reputationPoints Total reputation points
     * @return credentialCount Number of verified credentials
     * @return lastRewardTime Timestamp of last reward
     */
    function getUserRewards(address user) external view returns (
        uint256 totalRewards,
        uint256 reputationPoints,
        uint256 credentialCount,
        uint256 lastRewardTime
    ) {
        UserRewards memory rewards = userRewards[user];
        return (
            rewards.totalRewards,
            rewards.reputationPoints,
            rewards.credentialCount,
            rewards.lastRewardTime
        );
    }
    
    /**
     * @dev Get verifier fee information
     * @param verifier Address of the verifier
     * @return totalFees Total fees earned
     * @return verificationCount Number of verifications performed
     * @return lastFeeTime Timestamp of last fee payment
     */
    function getVerifierFees(address verifier) external view returns (
        uint256 totalFees,
        uint256 verificationCount,
        uint256 lastFeeTime
    ) {
        VerifierFees memory fees = verifierFees[verifier];
        return (
            fees.totalFees,
            fees.verificationCount,
            fees.lastFeeTime
        );
    }
    
    /**
     * @dev Emergency withdrawal function for owner
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(rewardToken.transfer(owner(), amount), "Emergency withdrawal failed");
    }
    
    /**
     * @dev Get contract token balance
     * @return Token balance of the contract
     */
    function getContractBalance() external view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }
}