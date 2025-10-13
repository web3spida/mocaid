const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to Moca Chain...");
  
  const [deployer] = await hre.ethers.getSigners();
  
  if (!deployer) {
    throw new Error("No deployer account found. Please check your PRIVATE_KEY in .env file");
  }
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy IdentityRegistry
  console.log("\n📋 Deploying IdentityRegistry...");
  const IdentityRegistry = await hre.ethers.getContractFactory("IdentityRegistry");
  const identityRegistry = await IdentityRegistry.deploy(deployer.address);
  await identityRegistry.waitForDeployment();
  console.log("✅ IdentityRegistry deployed to:", await identityRegistry.getAddress());

  // Deploy CredentialIssuer
  console.log("\n🎫 Deploying CredentialIssuer...");
  const CredentialIssuer = await hre.ethers.getContractFactory("CredentialIssuer");
  const credentialIssuer = await CredentialIssuer.deploy(deployer.address);
  await credentialIssuer.waitForDeployment();
  console.log("✅ CredentialIssuer deployed to:", await credentialIssuer.getAddress());

  // Deploy AccessControl
  console.log("\n🔐 Deploying AccessControl...");
  const AccessControl = await hre.ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy(deployer.address);
  await accessControl.waitForDeployment();
  console.log("✅ AccessControl deployed to:", await accessControl.getAddress());

  // Verify contracts on Moca Chain (if API key is available)
  if (process.env.MOCA_API_KEY) {
    console.log("\n🔍 Verifying contracts...");
    
    try {
      await hre.run("verify:verify", {
        address: await identityRegistry.getAddress(),
        constructorArguments: [deployer.address],
      });
      console.log("✅ IdentityRegistry verified");
    } catch (error) {
      console.log("❌ IdentityRegistry verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: await credentialIssuer.getAddress(),
        constructorArguments: [deployer.address],
      });
      console.log("✅ CredentialIssuer verified");
    } catch (error) {
      console.log("❌ CredentialIssuer verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: await accessControl.getAddress(),
        constructorArguments: [deployer.address],
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
      IdentityRegistry: await identityRegistry.getAddress(),
      CredentialIssuer: await credentialIssuer.getAddress(),
      AccessControl: await accessControl.getAddress(),
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
  console.log(`IdentityRegistry: ${await identityRegistry.getAddress()}`);
  console.log(`CredentialIssuer: ${await credentialIssuer.getAddress()}`);
  console.log(`AccessControl: ${await accessControl.getAddress()}`);
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