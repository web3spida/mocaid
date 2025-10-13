require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    moca: {
      url: "https://rpc.mocachain.com", // Replace with actual Moca Chain RPC URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1328, // Replace with actual Moca Chain ID
    },
    mocaTestnet: {
      url: "https://testnet-rpc.mocachain.com", // Replace with actual testnet RPC URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1329, // Replace with actual testnet chain ID
    },
  },
  etherscan: {
    apiKey: {
      moca: process.env.MOCA_API_KEY || "",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};