# MocaID Vault

A comprehensive decentralized identity management platform built on Moca Chain, featuring verifiable credentials, access control, and seamless wallet integration.

## 🌟 Features

### Decentralized Identity (DID)
- **DID Generation**: Create unique decentralized identifiers on Moca Chain
- **Identity Management**: Register, update, and revoke identities on-chain
- **DID Resolution**: Resolve and verify DID documents
- **Cross-chain Compatibility**: Built for Moca Chain with extensible architecture

### Verifiable Credentials
- **Credential Issuance**: Create tamper-proof verifiable credentials
- **Multi-format Support**: Support for various credential types and schemas
- **Credential Verification**: Cryptographic verification of credential authenticity
- **Revocation Management**: Secure credential revocation with on-chain tracking
- **Template System**: Pre-built templates for common credential types

### Access Control
- **Permission Management**: Granular control over data access permissions
- **Request System**: Structured access request and approval workflow
- **Time-based Access**: Temporary access permissions with expiration
- **Audit Trail**: Complete history of access grants and revocations

### Modern UI/UX
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Dark/Light Mode**: Theme switching with user preferences
- **Wallet Integration**: Seamless connection with RainbowKit and Wagmi

## Architecture

### Smart Contracts
- **IdentityRegistry.sol**: Core identity management and DID operations
- **CredentialIssuer.sol**: Verifiable credential issuance and verification
- **AccessControl.sol**: Permission management and access control

### Frontend Stack
- **React 18**: Modern React with hooks and context
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions
- **Wagmi**: React hooks for Ethereum
- **RainbowKit**: Wallet connection interface

### Integration
- **AIR Kit SDK**: Moca's identity and credential management SDK
- **Moca Chain**: Layer 1 blockchain for identity operations
- **IPFS**: Decentralized storage for credential metadata

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **MetaMask** or compatible Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fmsticks2/mocaid-vault.git
   cd mocaid-vault
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment templates
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   ```

4. **Configure Environment Variables**

   **Root `.env`:**
   ```env
   # Moca Chain Configuration
   MOCA_TESTNET_RPC_URL=https://devnet-rpc.mocachain.org
   MOCA_TESTNET_CHAIN_ID=7001
   MOCA_TESTNET_EXPLORER=https://testnet-scan.mechain.tech

   # Private Keys (DO NOT COMMIT TO VERSION CONTROL)
   DEPLOYER_PRIVATE_KEY=your_deployer_private_key_here
   ISSUER_PRIVATE_KEY=your_issuer_private_key_here

   # Moca Chain API
   MOCA_API_KEY=your_moca_api_key_here

   # AIR Kit SDK Configuration
   AIRKIT_API_KEY=your_airkit_api_key_here
   AIRKIT_ENDPOINT=https://api.mocaverse.xyz/airkit
   AIRKIT_NETWORK=moca-testnet
   ```

   **Frontend `.env`:**
   ```env
   # Moca Chain Configuration
   VITE_MOCA_CHAIN_ID=7001
   VITE_MOCA_RPC_URL=https://devnet-rpc.mocachain.org
   VITE_MOCA_TESTNET_CHAIN_ID=7001
   VITE_MOCA_TESTNET_RPC_URL=https://devnet-rpc.mocachain.org
   VITE_MOCA_EXPLORER=https://testnet-scan.mechain.tech

   # Smart Contract Addresses (Update after deployment)
   VITE_IDENTITY_REGISTRY_ADDRESS=0x...
   VITE_CREDENTIAL_ISSUER_ADDRESS=0x...
   VITE_ACCESS_CONTROL_ADDRESS=0x...

   # AIR Kit SDK Configuration
   VITE_AIRKIT_API_KEY=your_airkit_api_key_here
   VITE_AIRKIT_ENDPOINT=https://api.mocaverse.xyz/airkit
   VITE_AIRKIT_NETWORK=moca-testnet

   # Application Configuration
   VITE_APP_NAME=MocaID Vault
   VITE_APP_DESCRIPTION=Decentralized Identity Management on Moca Chain
   VITE_APP_URL=https://mocaid.network

   # WalletConnect Project ID
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   ```

### 🔧 Development

1. **Compile Smart Contracts**
   ```bash
   npx hardhat compile
   ```

2. **Run Tests**
   ```bash
   npx hardhat test
   ```

3. **Deploy to Local Network**
   ```bash
   # Start local Hardhat network
   npx hardhat node

   # Deploy contracts (in another terminal)
   npx hardhat run scripts/deploy.js --network localhost
   ```

4. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Open [http://localhost:5173](http://localhost:5173) in your browser
   - Connect your wallet (MetaMask recommended)
   - Start managing your decentralized identity!

## 🌐 Deployment

### Smart Contract Deployment

1. **Deploy to Moca Testnet**
   ```bash
   npx hardhat run scripts/deploy.js --network moca-testnet
   ```

2. **Deploy to Moca Mainnet**
   ```bash
   npx hardhat run scripts/deploy.js --network moca-mainnet
   ```

3. **Verify Contracts**
   ```bash
   npx hardhat verify --network moca-testnet <CONTRACT_ADDRESS>
   ```

### Frontend Deployment

1. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

## 📖 Usage Guide

### 🆔 Managing Your Identity

1. **Generate DID**
   - Navigate to "My Identity"
   - Click "Generate DID"
   - Confirm the transaction in your wallet

2. **Register Identity**
   - Fill in your identity information
   - Click "Register Identity"
   - Wait for blockchain confirmation

3. **Update Identity**
   - Modify your information
   - Click "Update Identity"
   - Confirm the update transaction

### 🏆 Working with Credentials

1. **Create Credential**
   - Go to "My Credentials"
   - Click "Create New Credential"
   - Fill in credential details
   - Submit and sign the credential

2. **Verify Credential**
   - Navigate to "Verification"
   - Paste credential JSON or scan QR code
   - View verification results

3. **Share Credential**
   - Select credential from your list
   - Click "Share"
   - Generate QR code or copy link

### 🔒 Access Control

1. **Grant Access**
   - Go to "Access Control"
   - Click "Grant Access"
   - Specify permissions and duration
   - Confirm the transaction

2. **Request Access**
   - Click "Request Access"
   - Specify what data you need
   - Submit the request
   - Wait for approval

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx hardhat test test/IdentityRegistry.test.js

# Run tests with coverage
npx hardhat coverage

# Run frontend tests
cd frontend
npm test
```

### Test Coverage

The project includes comprehensive tests for:
- ✅ Smart contract functionality
- ✅ Identity registration and management
- ✅ Credential issuance and verification
- ✅ Access control permissions
- ✅ Frontend component interactions

## 🔧 Configuration

### Hardhat Configuration

The project uses Hardhat for smart contract development with the following networks configured:

- **localhost**: Local development network
- **moca-testnet**: Moca Chain testnet
- **moca-mainnet**: Moca Chain mainnet

### Frontend Configuration

- **Vite**: Build tool and development server
- **TailwindCSS**: Styling and responsive design
- **Wagmi**: Ethereum React hooks
- **RainbowKit**: Wallet connection UI

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Moca Chain Documentation](https://docs.moca.network)
- [AIR Kit SDK Guide](https://docs.mocaverse.xyz/airkit)
- [Hardhat Documentation](https://hardhat.org/docs)

### Community
- [Discord](https://discord.gg/mocaverse)
- [Telegram](https://t.me/mocaverse)
- [Twitter](https://twitter.com/mocaverse)

### Issues
If you encounter any issues, please:
1. Check existing [GitHub Issues](https://github.com/your-username/mocaid-vault/issues)
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core identity management
- ✅ Verifiable credentials
- ✅ Access control system
- ✅ Web interface

### Phase 2 (Q2 2024)
- 🔄 Mobile application
- 🔄 Advanced credential templates
- 🔄 Multi-chain support
- 🔄 Enterprise features

### Phase 3 (Q3 2024)
- 🔄 Credential marketplace
- 🔄 Advanced analytics
- 🔄 API integrations
- 🔄 Governance features

## 🙏 Acknowledgments

- **Moca Network** for the blockchain infrastructure
- **AIR Kit SDK** for identity management tools
- **OpenZeppelin** for secure smart contract libraries
- **React Community** for the amazing ecosystem
- **All Contributors** who help improve this project

---

**Built with ❤️ for the decentralized future**

For more information, visit [mocaid.network](https://mocaid.network)