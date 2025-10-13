const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityRegistry", function () {
  let identityRegistry;
  let owner, user1, user2;
  const testDID1 = "did:moca:123456789abcdef";
  const testDID2 = "did:moca:987654321fedcba";
  const updatedDID = "did:moca:updated123456789";

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    identityRegistry = await IdentityRegistry.deploy();
    await identityRegistry.deployed();
  });

  describe("Identity Registration", function () {
    it("Should register a new identity", async function () {
      await expect(identityRegistry.connect(user1).registerIdentity(user1.address, testDID1))
        .to.emit(identityRegistry, "IdentityRegistered")
        .withArgs(user1.address, testDID1, await getBlockTimestamp());

      expect(await identityRegistry.hasIdentity(user1.address)).to.be.true;
      expect(await identityRegistry.totalIdentities()).to.equal(1);
    });

    it("Should not allow duplicate identity registration", async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
      
      await expect(
        identityRegistry.connect(user1).registerIdentity(user1.address, testDID2)
      ).to.be.revertedWith("Identity already exists");
    });

    it("Should not allow duplicate DID URI", async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
      
      await expect(
        identityRegistry.connect(user2).registerIdentity(user2.address, testDID1)
      ).to.be.revertedWith("DID URI already registered");
    });

    it("Should not allow empty DID URI", async function () {
      await expect(
        identityRegistry.connect(user1).registerIdentity(user1.address, "")
      ).to.be.revertedWith("DID URI cannot be empty");
    });

    it("Should only allow identity owner or contract owner to register", async function () {
      await expect(
        identityRegistry.connect(user2).registerIdentity(user1.address, testDID1)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Identity Updates", function () {
    beforeEach(async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
    });

    it("Should update existing identity", async function () {
      await expect(identityRegistry.connect(user1).updateIdentity(user1.address, updatedDID))
        .to.emit(identityRegistry, "IdentityUpdated")
        .withArgs(user1.address, testDID1, updatedDID, await getBlockTimestamp());

      const [didURI] = await identityRegistry.getIdentity(user1.address);
      expect(didURI).to.equal(updatedDID);
    });

    it("Should not update non-existent identity", async function () {
      await expect(
        identityRegistry.connect(user2).updateIdentity(user2.address, updatedDID)
      ).to.be.revertedWith("Identity does not exist");
    });

    it("Should not allow empty new DID URI", async function () {
      await expect(
        identityRegistry.connect(user1).updateIdentity(user1.address, "")
      ).to.be.revertedWith("New DID URI cannot be empty");
    });

    it("Should not allow updating to existing DID URI", async function () {
      await identityRegistry.connect(user2).registerIdentity(user2.address, testDID2);
      
      await expect(
        identityRegistry.connect(user1).updateIdentity(user1.address, testDID2)
      ).to.be.revertedWith("New DID URI already registered");
    });
  });

  describe("Identity Queries", function () {
    beforeEach(async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
    });

    it("Should get identity information", async function () {
      const [didURI, createdAt, updatedAt] = await identityRegistry.getIdentity(user1.address);
      
      expect(didURI).to.equal(testDID1);
      expect(createdAt).to.be.gt(0);
      expect(updatedAt).to.equal(createdAt);
    });

    it("Should get address from DID URI", async function () {
      const address = await identityRegistry.getAddressFromDID(testDID1);
      expect(address).to.equal(user1.address);
    });

    it("Should check if identity exists", async function () {
      expect(await identityRegistry.hasIdentity(user1.address)).to.be.true;
      expect(await identityRegistry.hasIdentity(user2.address)).to.be.false;
    });

    it("Should revert when getting non-existent identity", async function () {
      await expect(
        identityRegistry.getIdentity(user2.address)
      ).to.be.revertedWith("Identity does not exist");
    });
  });

  describe("Identity Revocation", function () {
    beforeEach(async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
    });

    it("Should allow owner to revoke identity", async function () {
      await expect(identityRegistry.connect(owner).revokeIdentity(user1.address))
        .to.emit(identityRegistry, "IdentityRevoked")
        .withArgs(user1.address, testDID1, await getBlockTimestamp());

      expect(await identityRegistry.hasIdentity(user1.address)).to.be.false;
      expect(await identityRegistry.totalIdentities()).to.equal(0);
    });

    it("Should not allow non-owner to revoke identity", async function () {
      await expect(
        identityRegistry.connect(user2).revokeIdentity(user1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should not revoke non-existent identity", async function () {
      await expect(
        identityRegistry.connect(owner).revokeIdentity(user2.address)
      ).to.be.revertedWith("Identity does not exist");
    });
  });

  describe("Registered Users", function () {
    it("Should get registered users with pagination", async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
      await identityRegistry.connect(user2).registerIdentity(user2.address, testDID2);

      const users = await identityRegistry.getRegisteredUsers(0, 10);
      expect(users.length).to.equal(2);
      expect(users[0]).to.equal(user1.address);
      expect(users[1]).to.equal(user2.address);
    });

    it("Should handle pagination correctly", async function () {
      await identityRegistry.connect(user1).registerIdentity(user1.address, testDID1);
      await identityRegistry.connect(user2).registerIdentity(user2.address, testDID2);

      const firstPage = await identityRegistry.getRegisteredUsers(0, 1);
      expect(firstPage.length).to.equal(1);
      expect(firstPage[0]).to.equal(user1.address);

      const secondPage = await identityRegistry.getRegisteredUsers(1, 1);
      expect(secondPage.length).to.equal(1);
      expect(secondPage[0]).to.equal(user2.address);
    });

    it("Should revert on invalid offset", async function () {
      await expect(
        identityRegistry.getRegisteredUsers(10, 5)
      ).to.be.revertedWith("Offset out of bounds");
    });
  });

  // Helper function to get current block timestamp
  async function getBlockTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp + 1; // Add 1 for the next block
  }
});