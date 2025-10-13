const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to Moca Chain...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy IdentityRegistry
  console.log("\n📋 Deploying IdentityRegistry...");
  const IdentityRegistry = await hre.ethers.getContractFactory("IdentityRegistry");
  const identityRegistry = await IdentityRegistry.deploy();
  await identityRegistry.deployed();
  console.log("✅ IdentityRegistry deployed to:", identityRegistry.address);

  // Deploy CredentialIssuer
  console.log("\n🎫 Deploying CredentialIssuer...");
  const CredentialIssuer = await hre.ethers.getContractFactory("CredentialIssuer");
  const credentialIssuer = await CredentialIssuer.deploy();
  await credentialIssuer.deployed();
  console.log("✅ CredentialIssuer deployed to:", credentialIssuer.address);

  // Deploy AccessControl
  console.log("\n🔐 Deploying AccessControl...");
  const AccessControl = await hre.ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();
  await accessControl.deployed();
  console.log("✅ AccessControl deployed to:", accessControl.address);

  // Verify contracts on Moca Chain (if API key is available)
  if (process.env.MOCA_API_KEY) {
    console.log("\n🔍 Verifying contracts...");
    
    try {
      await hre.run("verify:verify", {
        address: identityRegistry.address,
        constructorArguments: [],
      });
      console.log("✅ IdentityRegistry verified");
    } catch (error) {
      console.log("❌ IdentityRegistry verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: credentialIssuer.address,
        constructorArguments: [],
      });
      console.log("✅ CredentialIssuer verified");
    } catch (error) {
      console.log("❌ CredentialIssuer verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: accessControl.address,
        constructorArguments: [],
      });
      console.log("✅ AccessControl verified");
    } catch (error) {
      console.log("❌ AccessControl verification failed:", error.message);
    }
  }

  // Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    contracts: {
      IdentityRegistry: identityRegistry.address,
      CredentialIssuer: credentialIssuer.address,
      AccessControl: accessControl.address,
    },
    deployedAt: new Date().toISOString(),
  };

  const fs = require("fs");
  const path = require("path");
  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Save deployment info
  fs.writeFileSync(
    path.join(deploymentsDir, `${hre.network.name}.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n📄 Deployment Summary:");
  console.log("=".repeat(50));
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${hre.network.config.chainId}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`IdentityRegistry: ${identityRegistry.address}`);
  console.log(`CredentialIssuer: ${credentialIssuer.address}`);
  console.log(`AccessControl: ${accessControl.address}`);
  console.log("=".repeat(50));

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📝 Next steps:");
  console.log("1. Update your .env file with the contract addresses");
  console.log("2. Update frontend configuration with the new addresses");
  console.log("3. Test the contracts using the frontend or scripts");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });