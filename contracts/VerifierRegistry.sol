// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title VerifierRegistry
 * @dev Manages verifier staking, reputation, and slashing logic for Credora Protocol
 */
contract VerifierRegistry is Ownable, ReentrancyGuard {
    
    struct Verifier {
        uint256 stakedAmount;
        uint256 reputationScore;
        uint256 verificationCount;
        uint256 successfulVerifications;
        uint256 slashedAmount;
        uint256 registeredAt;
        bool isActive;
        bool exists;
    }
    
    // State variables
    mapping(address => Verifier) public verifiers;
    address[] public verifierList;
    
    IERC20 public stakingToken; // MOCA token for staking
    uint256 public minimumStake = 1000 * 10**18; // 1000 MOCA minimum stake
    uint256 public slashingPercentage = 10; // 10% slashing for fraud
    uint256 public reputationThreshold = 80; // 80% success rate threshold
    
    // Events
    event VerifierRegistered(address indexed verifier, uint256 stakedAmount, uint256 timestamp);
    event VerifierDeregistered(address indexed verifier, uint256 timestamp);
    event StakeIncreased(address indexed verifier, uint256 amount, uint256 newTotal);
    event StakeWithdrawn(address indexed verifier, uint256 amount, uint256 remaining);
    event VerifierSlashed(address indexed verifier, uint256 slashedAmount, string reason);
    event ReputationUpdated(address indexed verifier, uint256 newScore, uint256 verificationCount);
    event ConfigUpdated(uint256 minimumStake, uint256 slashingPercentage, uint256 reputationThreshold);
    
    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }
    
    /**
     * @dev Register as a verifier by staking tokens
     * @param stakeAmount Amount of tokens to stake
     */
    function registerVerifier(uint256 stakeAmount) external nonReentrant {
        require(stakeAmount >= minimumStake, "Insufficient stake amount");
        require(!verifiers[msg.sender].exists, "Verifier already registered");
        
        // Transfer stake from verifier
        require(stakingToken.transferFrom(msg.sender, address(this), stakeAmount), "Stake transfer failed");
        
        // Register verifier
        verifiers[msg.sender] = Verifier({
            stakedAmount: stakeAmount,
            reputationScore: 100, // Start with perfect reputation
            verificationCount: 0,
            successfulVerifications: 0,
            slashedAmount: 0,
            registeredAt: block.timestamp,
            isActive: true,
            exists: true
        });
        
        verifierList.push(msg.sender);
        
        emit VerifierRegistered(msg.sender, stakeAmount, block.timestamp);
    }
    
    /**
     * @dev Deregister as a verifier and withdraw stake
     */
    function deregisterVerifier() external nonReentrant {
        require(verifiers[msg.sender].exists, "Verifier not registered");
        require(verifiers[msg.sender].isActive, "Verifier already inactive");
        
        Verifier storage verifier = verifiers[msg.sender];
        uint256 withdrawAmount = verifier.stakedAmount;
        
        // Deactivate verifier
        verifier.isActive = false;
        verifier.stakedAmount = 0;
        
        // Transfer stake back to verifier
        require(stakingToken.transfer(msg.sender, withdrawAmount), "Stake withdrawal failed");
        
        emit VerifierDeregistered(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Increase stake amount
     * @param additionalStake Additional amount to stake
     */
    function increaseStake(uint256 additionalStake) external nonReentrant {
        require(verifiers[msg.sender].exists, "Verifier not registered");
        require(verifiers[msg.sender].isActive, "Verifier not active");
        require(additionalStake > 0, "Invalid stake amount");
        
        // Transfer additional stake
        require(stakingToken.transferFrom(msg.sender, address(this), additionalStake), "Stake transfer failed");
        
        verifiers[msg.sender].stakedAmount += additionalStake;
        
        emit StakeIncreased(msg.sender, additionalStake, verifiers[msg.sender].stakedAmount);
    }
    
    /**
     * @dev Withdraw partial stake (if above minimum)
     * @param withdrawAmount Amount to withdraw
     */
    function withdrawStake(uint256 withdrawAmount) external nonReentrant {
        require(verifiers[msg.sender].exists, "Verifier not registered");
        require(verifiers[msg.sender].isActive, "Verifier not active");
        
        Verifier storage verifier = verifiers[msg.sender];
        require(withdrawAmount > 0, "Invalid withdrawal amount");
        require(withdrawAmount <= verifier.stakedAmount, "Insufficient staked amount");
        require(verifier.stakedAmount - withdrawAmount >= minimumStake, "Would fall below minimum stake");
        
        verifier.stakedAmount -= withdrawAmount;
        
        // Transfer withdrawn amount
        require(stakingToken.transfer(msg.sender, withdrawAmount), "Withdrawal failed");
        
        emit StakeWithdrawn(msg.sender, withdrawAmount, verifier.stakedAmount);
    }
    
    /**
     * @dev Record verification result and update reputation
     * @param verifier Address of the verifier
     * @param isSuccessful Whether the verification was successful
     */
    function recordVerification(address verifier, bool isSuccessful) external onlyOwner {
        require(verifiers[verifier].exists, "Verifier not registered");
        require(verifiers[verifier].isActive, "Verifier not active");
        
        Verifier storage v = verifiers[verifier];
        v.verificationCount += 1;
        
        if (isSuccessful) {
            v.successfulVerifications += 1;
        }
        
        // Update reputation score (percentage of successful verifications)
        v.reputationScore = (v.successfulVerifications * 100) / v.verificationCount;
        
        emit ReputationUpdated(verifier, v.reputationScore, v.verificationCount);
    }
    
    /**
     * @dev Slash verifier for fraudulent behavior
     * @param verifier Address of the verifier to slash
     * @param reason Reason for slashing
     */
    function slashVerifier(address verifier, string memory reason) external onlyOwner {
        require(verifiers[verifier].exists, "Verifier not registered");
        require(verifiers[verifier].isActive, "Verifier not active");
        
        Verifier storage v = verifiers[verifier];
        uint256 slashAmount = (v.stakedAmount * slashingPercentage) / 100;
        
        v.slashedAmount += slashAmount;
        v.stakedAmount -= slashAmount;
        
        // If stake falls below minimum, deactivate verifier
        if (v.stakedAmount < minimumStake) {
            v.isActive = false;
        }
        
        emit VerifierSlashed(verifier, slashAmount, reason);
    }
    
    /**
     * @dev Get verifier information
     * @param verifier Address of the verifier
     * @return Verifier struct data
     */
    function getVerifier(address verifier) external view returns (
        uint256 stakedAmount,
        uint256 reputationScore,
        uint256 verificationCount,
        uint256 successfulVerifications,
        uint256 slashedAmount,
        uint256 registeredAt,
        bool isActive,
        bool exists
    ) {
        Verifier memory v = verifiers[verifier];
        return (
            v.stakedAmount,
            v.reputationScore,
            v.verificationCount,
            v.successfulVerifications,
            v.slashedAmount,
            v.registeredAt,
            v.isActive,
            v.exists
        );
    }
    
    /**
     * @dev Get all active verifiers
     * @return Array of active verifier addresses
     */
    function getActiveVerifiers() external view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // Count active verifiers
        for (uint256 i = 0; i < verifierList.length; i++) {
            if (verifiers[verifierList[i]].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active verifiers
        address[] memory activeVerifiers = new address[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < verifierList.length; i++) {
            if (verifiers[verifierList[i]].isActive) {
                activeVerifiers[index] = verifierList[i];
                index++;
            }
        }
        
        return activeVerifiers;
    }
    
    /**
     * @dev Check if address is an active verifier
     * @param verifier Address to check
     * @return True if verifier is active
     */
    function isActiveVerifier(address verifier) external view returns (bool) {
        return verifiers[verifier].exists && verifiers[verifier].isActive;
    }
    
    /**
     * @dev Update configuration parameters
     * @param _minimumStake New minimum stake amount
     * @param _slashingPercentage New slashing percentage
     * @param _reputationThreshold New reputation threshold
     */
    function updateConfig(
        uint256 _minimumStake,
        uint256 _slashingPercentage,
        uint256 _reputationThreshold
    ) external onlyOwner {
        require(_slashingPercentage <= 50, "Slashing percentage too high");
        require(_reputationThreshold <= 100, "Invalid reputation threshold");
        
        minimumStake = _minimumStake;
        slashingPercentage = _slashingPercentage;
        reputationThreshold = _reputationThreshold;
        
        emit ConfigUpdated(_minimumStake, _slashingPercentage, _reputationThreshold);
    }
    
    /**
     * @dev Get total number of verifiers
     * @return Total verifier count
     */
    function getTotalVerifiers() external view returns (uint256) {
        return verifierList.length;
    }
    
    /**
     * @dev Emergency withdrawal for owner (slashed funds)
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(stakingToken.transfer(owner(), amount), "Emergency withdrawal failed");
    }
}