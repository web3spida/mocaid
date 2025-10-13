// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title AccessControl
 * @dev Handles permissioned access to identity or credential data
 */
contract AccessControl is Ownable, ReentrancyGuard {
    struct AccessPermission {
        address grantor;
        address grantee;
        string resourceId;
        string permissionType; // "read", "write", "admin"
        uint256 grantedAt;
        uint256 expiresAt;
        bool isActive;
        bool exists;
    }

    struct AccessRequest {
        address requester;
        address resourceOwner;
        string resourceId;
        string permissionType;
        string reason;
        uint256 requestedAt;
        uint256 expiresAt;
        bool isApproved;
        bool isRejected;
        bool exists;
    }

    mapping(bytes32 => AccessPermission) private permissions;
    mapping(address => bytes32[]) private grantorPermissions;
    mapping(address => bytes32[]) private granteePermissions;
    mapping(string => bytes32[]) private resourcePermissions;
    
    mapping(bytes32 => AccessRequest) private accessRequests;
    mapping(address => bytes32[]) private userRequests;
    
    bytes32[] public allPermissions;
    bytes32[] public allRequests;
    uint256 public totalPermissions;
    uint256 public totalRequests;

    event AccessGranted(
        address indexed grantor,
        address indexed grantee,
        string resourceId,
        string permissionType,
        uint256 grantedAt,
        uint256 expiresAt
    );
    
    event AccessRevoked(
        address indexed grantor,
        address indexed grantee,
        string resourceId,
        uint256 revokedAt
    );
    
    event AccessRequested(
        address indexed requester,
        address indexed resourceOwner,
        string resourceId,
        string permissionType,
        string reason,
        uint256 requestedAt
    );
    
    event AccessRequestApproved(
        address indexed resourceOwner,
        address indexed requester,
        string resourceId,
        uint256 approvedAt
    );
    
    event AccessRequestRejected(
        address indexed resourceOwner,
        address indexed requester,
        string resourceId,
        uint256 rejectedAt
    );

    modifier onlyResourceOwner(address grantor) {
        require(msg.sender == grantor || msg.sender == owner(), "Not resource owner");
        _;
    }

    modifier permissionExists(bytes32 permissionId) {
        require(permissions[permissionId].exists, "Permission does not exist");
        _;
    }

    modifier requestExists(bytes32 requestId) {
        require(accessRequests[requestId].exists, "Request does not exist");
        _;
    }

    /**
     * @dev Generate permission ID from grantor, grantee, and resource
     * @param grantor The address granting access
     * @param grantee The address receiving access
     * @param resourceId The resource identifier
     * @return The permission ID
     */
    function generatePermissionId(
        address grantor,
        address grantee,
        string memory resourceId
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(grantor, grantee, resourceId));
    }

    /**
     * @dev Generate request ID from requester, owner, and resource
     * @param requester The address requesting access
     * @param resourceOwner The resource owner address
     * @param resourceId The resource identifier
     * @return The request ID
     */
    function generateRequestId(
        address requester,
        address resourceOwner,
        string memory resourceId
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(requester, resourceOwner, resourceId, block.timestamp));
    }

    /**
     * @dev Grant access to a resource
     * @param grantee The address to grant access to
     * @param resourceId The resource identifier
     * @param permissionType The type of permission ("read", "write", "admin")
     * @param expiresAt Expiration timestamp (0 for permanent)
     */
    function grantAccess(
        address grantee,
        string memory resourceId,
        string memory permissionType,
        uint256 expiresAt
    ) public nonReentrant {
        require(grantee != address(0), "Invalid grantee address");
        require(bytes(resourceId).length > 0, "Resource ID cannot be empty");
        require(bytes(permissionType).length > 0, "Permission type cannot be empty");
        
        if (expiresAt > 0) {
            require(expiresAt > block.timestamp, "Expiration must be in the future");
        }

        bytes32 permissionId = generatePermissionId(msg.sender, grantee, resourceId);
        require(!permissions[permissionId].exists, "Permission already exists");

        permissions[permissionId] = AccessPermission({
            grantor: msg.sender,
            grantee: grantee,
            resourceId: resourceId,
            permissionType: permissionType,
            grantedAt: block.timestamp,
            expiresAt: expiresAt,
            isActive: true,
            exists: true
        });

        grantorPermissions[msg.sender].push(permissionId);
        granteePermissions[grantee].push(permissionId);
        resourcePermissions[resourceId].push(permissionId);
        allPermissions.push(permissionId);
        totalPermissions++;

        emit AccessGranted(
            msg.sender,
            grantee,
            resourceId,
            permissionType,
            block.timestamp,
            expiresAt
        );
    }

    /**
     * @dev Revoke access to a resource
     * @param grantee The address to revoke access from
     * @param resourceId The resource identifier
     */
    function revokeAccess(address grantee, string memory resourceId) 
        public 
        nonReentrant 
    {
        bytes32 permissionId = generatePermissionId(msg.sender, grantee, resourceId);
        require(permissions[permissionId].exists, "Permission does not exist");
        require(permissions[permissionId].isActive, "Permission already revoked");
        require(
            permissions[permissionId].grantor == msg.sender || msg.sender == owner(),
            "Not authorized to revoke"
        );

        permissions[permissionId].isActive = false;

        emit AccessRevoked(msg.sender, grantee, resourceId, block.timestamp);
    }

    /**
     * @dev Check if access is granted and valid
     * @param grantor The grantor address
     * @param grantee The grantee address
     * @param resourceId The resource identifier
     * @return hasAccess True if access is granted and valid
     */
    function checkAccess(
        address grantor,
        address grantee,
        string memory resourceId
    ) public view returns (bool hasAccess) {
        bytes32 permissionId = generatePermissionId(grantor, grantee, resourceId);
        
        if (!permissions[permissionId].exists) {
            return false;
        }

        AccessPermission memory permission = permissions[permissionId];
        
        // Check if permission is active
        if (!permission.isActive) {
            return false;
        }

        // Check if expired (0 means no expiration)
        if (permission.expiresAt > 0 && block.timestamp > permission.expiresAt) {
            return false;
        }

        return true;
    }

    /**
     * @dev Request access to a resource
     * @param resourceOwner The owner of the resource
     * @param resourceId The resource identifier
     * @param permissionType The requested permission type
     * @param reason The reason for the request
     * @param expiresAt When the request expires
     */
    function requestAccess(
        address resourceOwner,
        string memory resourceId,
        string memory permissionType,
        string memory reason,
        uint256 expiresAt
    ) public nonReentrant {
        require(resourceOwner != address(0), "Invalid resource owner");
        require(bytes(resourceId).length > 0, "Resource ID cannot be empty");
        require(bytes(permissionType).length > 0, "Permission type cannot be empty");
        require(msg.sender != resourceOwner, "Cannot request access to own resource");
        
        if (expiresAt > 0) {
            require(expiresAt > block.timestamp, "Expiration must be in the future");
        }

        bytes32 requestId = generateRequestId(msg.sender, resourceOwner, resourceId);

        accessRequests[requestId] = AccessRequest({
            requester: msg.sender,
            resourceOwner: resourceOwner,
            resourceId: resourceId,
            permissionType: permissionType,
            reason: reason,
            requestedAt: block.timestamp,
            expiresAt: expiresAt,
            isApproved: false,
            isRejected: false,
            exists: true
        });

        userRequests[msg.sender].push(requestId);
        userRequests[resourceOwner].push(requestId);
        allRequests.push(requestId);
        totalRequests++;

        emit AccessRequested(
            msg.sender,
            resourceOwner,
            resourceId,
            permissionType,
            reason,
            block.timestamp
        );
    }

    /**
     * @dev Approve an access request
     * @param requestId The request ID to approve
     * @param expiresAt Expiration for the granted permission (0 for permanent)
     */
    function approveAccessRequest(bytes32 requestId, uint256 expiresAt) 
        public 
        nonReentrant 
        requestExists(requestId) 
    {
        AccessRequest storage request = accessRequests[requestId];
        require(msg.sender == request.resourceOwner, "Not resource owner");
        require(!request.isApproved && !request.isRejected, "Request already processed");
        
        if (request.expiresAt > 0) {
            require(block.timestamp <= request.expiresAt, "Request expired");
        }

        request.isApproved = true;

        // Grant the access
        this.grantAccess(
            request.requester,
            request.resourceId,
            request.permissionType,
            expiresAt
        );

        emit AccessRequestApproved(
            msg.sender,
            request.requester,
            request.resourceId,
            block.timestamp
        );
    }

    /**
     * @dev Reject an access request
     * @param requestId The request ID to reject
     */
    function rejectAccessRequest(bytes32 requestId) 
        public 
        nonReentrant 
        requestExists(requestId) 
    {
        AccessRequest storage request = accessRequests[requestId];
        require(msg.sender == request.resourceOwner, "Not resource owner");
        require(!request.isApproved && !request.isRejected, "Request already processed");

        request.isRejected = true;

        emit AccessRequestRejected(
            msg.sender,
            request.requester,
            request.resourceId,
            block.timestamp
        );
    }

    /**
     * @dev Get permission details
     * @param permissionId The permission ID
     * @return grantor The grantor address
     * @return grantee The grantee address
     * @return resourceId The resource ID
     * @return permissionType The permission type
     * @return grantedAt Grant timestamp
     * @return expiresAt Expiration timestamp
     * @return isActive Active status
     */
    function getPermission(bytes32 permissionId) 
        public 
        view 
        permissionExists(permissionId) 
        returns (
            address grantor,
            address grantee,
            string memory resourceId,
            string memory permissionType,
            uint256 grantedAt,
            uint256 expiresAt,
            bool isActive
        ) 
    {
        AccessPermission memory permission = permissions[permissionId];
        return (
            permission.grantor,
            permission.grantee,
            permission.resourceId,
            permission.permissionType,
            permission.grantedAt,
            permission.expiresAt,
            permission.isActive
        );
    }

    /**
     * @dev Get permissions granted by an address
     * @param grantor The grantor address
     * @return permissionIds Array of permission IDs
     */
    function getGrantorPermissions(address grantor) 
        public 
        view 
        returns (bytes32[] memory permissionIds) 
    {
        return grantorPermissions[grantor];
    }

    /**
     * @dev Get permissions received by an address
     * @param grantee The grantee address
     * @return permissionIds Array of permission IDs
     */
    function getGranteePermissions(address grantee) 
        public 
        view 
        returns (bytes32[] memory permissionIds) 
    {
        return granteePermissions[grantee];
    }

    /**
     * @dev Get all permissions for a resource
     * @param resourceId The resource ID
     * @return permissionIds Array of permission IDs
     */
    function getResourcePermissions(string memory resourceId) 
        public 
        view 
        returns (bytes32[] memory permissionIds) 
    {
        return resourcePermissions[resourceId];
    }

    /**
     * @dev Get access requests for a user
     * @param user The user address
     * @return requestIds Array of request IDs
     */
    function getUserRequests(address user) 
        public 
        view 
        returns (bytes32[] memory requestIds) 
    {
        return userRequests[user];
    }
}