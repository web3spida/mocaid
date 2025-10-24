// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AnalyticsModule
 * @dev Aggregates credential statistics for dashboards and leaderboards in Veyra Protocol
 */
contract AnalyticsModule is Ownable {
    
    struct UserStats {
        uint256 totalCredentials;
        uint256 totalRewards;
        uint256 reputationPoints;
        uint256 rank;
        uint256 lastActivity;
    }
    
    struct VerifierStats {
        uint256 totalVerifications;
        uint256 totalFees;
        uint256 reputationScore;
        uint256 rank;
        uint256 lastActivity;
    }
    
    struct GlobalStats {
        uint256 totalUsers;
        uint256 totalVerifiers;
        uint256 totalCredentials;
        uint256 totalRewardsDistributed;
        uint256 totalFeesCollected;
        uint256 lastUpdated;
    }
    
    struct CredentialTypeStats {
        uint256 count;
        uint256 totalRewards;
        uint256 averageReward;
        uint256 lastIssued;
    }
    
    // State variables
    mapping(address => UserStats) public userStats;
    mapping(address => VerifierStats) public verifierStats;
    mapping(string => CredentialTypeStats) public credentialTypeStats;
    
    address[] public userLeaderboard;
    address[] public verifierLeaderboard;
    string[] public credentialTypes;
    
    GlobalStats public globalStats;
    
    // Authorized contracts that can update stats
    mapping(address => bool) public authorizedUpdaters;
    
    // Events
    event UserStatsUpdated(address indexed user, uint256 credentials, uint256 rewards, uint256 reputation);
    event VerifierStatsUpdated(address indexed verifier, uint256 verifications, uint256 fees, uint256 reputation);
    event GlobalStatsUpdated(uint256 totalUsers, uint256 totalVerifiers, uint256 totalCredentials);
    event CredentialTypeStatsUpdated(string credentialType, uint256 count, uint256 totalRewards);
    event LeaderboardUpdated(uint256 timestamp);
    event AuthorizedUpdaterAdded(address indexed updater);
    event AuthorizedUpdaterRemoved(address indexed updater);
    
    modifier onlyAuthorized() {
        require(authorizedUpdaters[msg.sender] || msg.sender == owner(), "Not authorized to update stats");
        _;
    }
    
    constructor() Ownable(msg.sender) {
        globalStats.lastUpdated = block.timestamp;
    }
    
    /**
     * @dev Add authorized contract that can update stats
     * @param updater Address of the contract to authorize
     */
    function addAuthorizedUpdater(address updater) external onlyOwner {
        require(updater != address(0), "Invalid updater address");
        authorizedUpdaters[updater] = true;
        emit AuthorizedUpdaterAdded(updater);
    }
    
    /**
     * @dev Remove authorized contract
     * @param updater Address of the contract to remove
     */
    function removeAuthorizedUpdater(address updater) external onlyOwner {
        authorizedUpdaters[updater] = false;
        emit AuthorizedUpdaterRemoved(updater);
    }
    
    /**
     * @dev Update user statistics
     * @param user Address of the user
     * @param credentialCount New credential count
     * @param totalRewards New total rewards
     * @param reputationPoints New reputation points
     */
    function updateUserStats(
        address user,
        uint256 credentialCount,
        uint256 totalRewards,
        uint256 reputationPoints
    ) external onlyAuthorized {
        require(user != address(0), "Invalid user address");
        
        // If new user, add to leaderboard
        if (userStats[user].totalCredentials == 0 && credentialCount > 0) {
            userLeaderboard.push(user);
            globalStats.totalUsers++;
        }
        
        userStats[user] = UserStats({
            totalCredentials: credentialCount,
            totalRewards: totalRewards,
            reputationPoints: reputationPoints,
            rank: 0, // Will be calculated in updateLeaderboard
            lastActivity: block.timestamp
        });
        
        emit UserStatsUpdated(user, credentialCount, totalRewards, reputationPoints);
    }
    
    /**
     * @dev Update verifier statistics
     * @param verifier Address of the verifier
     * @param verificationCount New verification count
     * @param totalFees New total fees
     * @param reputationScore New reputation score
     */
    function updateVerifierStats(
        address verifier,
        uint256 verificationCount,
        uint256 totalFees,
        uint256 reputationScore
    ) external onlyAuthorized {
        require(verifier != address(0), "Invalid verifier address");
        
        // If new verifier, add to leaderboard
        if (verifierStats[verifier].totalVerifications == 0 && verificationCount > 0) {
            verifierLeaderboard.push(verifier);
            globalStats.totalVerifiers++;
        }
        
        verifierStats[verifier] = VerifierStats({
            totalVerifications: verificationCount,
            totalFees: totalFees,
            reputationScore: reputationScore,
            rank: 0, // Will be calculated in updateLeaderboard
            lastActivity: block.timestamp
        });
        
        emit VerifierStatsUpdated(verifier, verificationCount, totalFees, reputationScore);
    }
    
    /**
     * @dev Update credential type statistics
     * @param credentialType Type of credential
     * @param count New count for this type
     * @param totalRewards Total rewards for this type
     */
    function updateCredentialTypeStats(
        string memory credentialType,
        uint256 count,
        uint256 totalRewards
    ) external onlyAuthorized {
        // If new credential type, add to array
        if (credentialTypeStats[credentialType].count == 0 && count > 0) {
            credentialTypes.push(credentialType);
        }
        
        uint256 averageReward = count > 0 ? totalRewards / count : 0;
        
        credentialTypeStats[credentialType] = CredentialTypeStats({
            count: count,
            totalRewards: totalRewards,
            averageReward: averageReward,
            lastIssued: block.timestamp
        });
        
        emit CredentialTypeStatsUpdated(credentialType, count, totalRewards);
    }
    
    /**
     * @dev Update global statistics
     * @param totalCredentials New total credential count
     * @param totalRewardsDistributed New total rewards distributed
     * @param totalFeesCollected New total fees collected
     */
    function updateGlobalStats(
        uint256 totalCredentials,
        uint256 totalRewardsDistributed,
        uint256 totalFeesCollected
    ) external onlyAuthorized {
        globalStats.totalCredentials = totalCredentials;
        globalStats.totalRewardsDistributed = totalRewardsDistributed;
        globalStats.totalFeesCollected = totalFeesCollected;
        globalStats.lastUpdated = block.timestamp;
        
        emit GlobalStatsUpdated(globalStats.totalUsers, globalStats.totalVerifiers, totalCredentials);
    }
    
    /**
     * @dev Update leaderboard rankings
     */
    function updateLeaderboard() external onlyAuthorized {
        // Sort user leaderboard by reputation points (descending)
        _sortUserLeaderboard();
        
        // Sort verifier leaderboard by reputation score (descending)
        _sortVerifierLeaderboard();
        
        emit LeaderboardUpdated(block.timestamp);
    }
    
    /**
     * @dev Get top users from leaderboard
     * @param limit Number of top users to return
     * @return Array of top user addresses
     */
    function getTopUsers(uint256 limit) external view returns (address[] memory) {
        uint256 length = limit > userLeaderboard.length ? userLeaderboard.length : limit;
        address[] memory topUsers = new address[](length);
        
        for (uint256 i = 0; i < length; i++) {
            topUsers[i] = userLeaderboard[i];
        }
        
        return topUsers;
    }
    
    /**
     * @dev Get top verifiers from leaderboard
     * @param limit Number of top verifiers to return
     * @return Array of top verifier addresses
     */
    function getTopVerifiers(uint256 limit) external view returns (address[] memory) {
        uint256 length = limit > verifierLeaderboard.length ? verifierLeaderboard.length : limit;
        address[] memory topVerifiers = new address[](length);
        
        for (uint256 i = 0; i < length; i++) {
            topVerifiers[i] = verifierLeaderboard[i];
        }
        
        return topVerifiers;
    }
    
    /**
     * @dev Get all credential types
     * @return Array of credential type names
     */
    function getCredentialTypes() external view returns (string[] memory) {
        return credentialTypes;
    }
    
    /**
     * @dev Get user rank in leaderboard
     * @param user Address of the user
     * @return User's rank (1-based, 0 if not found)
     */
    function getUserRank(address user) external view returns (uint256) {
        for (uint256 i = 0; i < userLeaderboard.length; i++) {
            if (userLeaderboard[i] == user) {
                return i + 1; // 1-based ranking
            }
        }
        return 0; // Not found
    }
    
    /**
     * @dev Get verifier rank in leaderboard
     * @param verifier Address of the verifier
     * @return Verifier's rank (1-based, 0 if not found)
     */
    function getVerifierRank(address verifier) external view returns (uint256) {
        for (uint256 i = 0; i < verifierLeaderboard.length; i++) {
            if (verifierLeaderboard[i] == verifier) {
                return i + 1; // 1-based ranking
            }
        }
        return 0; // Not found
    }
    
    /**
     * @dev Internal function to sort user leaderboard by reputation points
     */
    function _sortUserLeaderboard() internal {
        uint256 length = userLeaderboard.length;
        
        // Simple bubble sort (can be optimized for larger datasets)
        for (uint256 i = 0; i < length; i++) {
            for (uint256 j = 0; j < length - i - 1; j++) {
                if (userStats[userLeaderboard[j]].reputationPoints < 
                    userStats[userLeaderboard[j + 1]].reputationPoints) {
                    // Swap
                    address temp = userLeaderboard[j];
                    userLeaderboard[j] = userLeaderboard[j + 1];
                    userLeaderboard[j + 1] = temp;
                }
            }
        }
        
        // Update ranks
        for (uint256 i = 0; i < length; i++) {
            userStats[userLeaderboard[i]].rank = i + 1;
        }
    }
    
    /**
     * @dev Internal function to sort verifier leaderboard by reputation score
     */
    function _sortVerifierLeaderboard() internal {
        uint256 length = verifierLeaderboard.length;
        
        // Simple bubble sort (can be optimized for larger datasets)
        for (uint256 i = 0; i < length; i++) {
            for (uint256 j = 0; j < length - i - 1; j++) {
                if (verifierStats[verifierLeaderboard[j]].reputationScore < 
                    verifierStats[verifierLeaderboard[j + 1]].reputationScore) {
                    // Swap
                    address temp = verifierLeaderboard[j];
                    verifierLeaderboard[j] = verifierLeaderboard[j + 1];
                    verifierLeaderboard[j + 1] = temp;
                }
            }
        }
        
        // Update ranks
        for (uint256 i = 0; i < length; i++) {
            verifierStats[verifierLeaderboard[i]].rank = i + 1;
        }
    }
}