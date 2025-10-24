# 🏆 Veyra Protocol

**Incentivized Credential Verification Protocol on Moca Chain**

Veyra Protocol is a fully functional decentralized identity and credential verification system that incentivizes users to verify their credentials while rewarding verifiers for their services. Built on Moca Chain with AIR Kit SDK integration, it creates a sustainable economy around digital identity verification.

## ✨ Features

### 🎯 User Incentives ✅ **IMPLEMENTED**
- **Earn MOCA Tokens**: Get rewarded for verifying your credentials (2.5 MOCA per verification)
- **Build Reputation**: Increase your credibility score through verified credentials
- **Unlock Benefits**: Access exclusive features and higher rewards with better reputation
- **Gamified Experience**: Earn badges, climb leaderboards, and compete with other users
- **Professional Dashboard**: Track your credential portfolio, earnings, and achievements

### 💼 Verifier Economy ✅ **IMPLEMENTED**
- **Stake to Verify**: Verifiers stake MOCA tokens to participate in the verification process
- **Earn Fees**: Collect verification fees (0.5 MOCA per verification) for providing services
- **Reputation System**: Build verifier reputation through accurate and timely verifications
- **Slashing Protection**: Maintain honest behavior to avoid stake slashing penalties
- **Verifier Dashboard**: Complete interface for managing stakes, earnings, and reputation

### 📋 Credential Management ✅ **IMPLEMENTED**
- **Decentralized Storage**: Credentials stored on-chain with privacy-preserving hashes
- **Multiple Types**: Support for various credential types (education, employment, skills, etc.)
- **Expiration Handling**: Automatic credential expiration and renewal notifications
- **Verification Status**: Real-time tracking of credential verification status
- **AIR Kit Integration**: Full integration with Moca's identity management SDK

### 📊 Protocol Analytics ✅ **IMPLEMENTED**
- **User Dashboard**: Track earned credentials, badges, reputation, and rewards
- **Verifier Dashboard**: Monitor staked tokens, verified credentials, fees, and reputation
- **Privacy-First Analytics**: Aggregate statistics without exposing personal information
- **Real-time Updates**: Live tracking of protocol activity and user progress
- **Leaderboards**: Competitive rankings for users and verifiers

### 🔗 Modern Integration ✅ **IMPLEMENTED**
- **Professional UI/UX**: Modern, responsive design with custom logo and branding
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Wallet Integration**: Seamless connection with RainbowKit and Wagmi
- **Mobile-First Design**: Fully responsive interface optimized for all devices
- **Interactive Modals**: Professional forms and dialogs for all user interactions

## Architecture

### Smart Contracts ✅ **DEPLOYED ON MOCA TESTNET**
- **CredentialRegistry**: Stores credential hashes, owners, and verification status
- **RewardManager**: Calculates and distributes rewards for users and fees for verifiers
- **VerifierRegistry**: Manages verifier staking, reputation, and slashing logic
- **AnalyticsModule**: Aggregates credential statistics for dashboards and leaderboards
- **CredentialIssuer**: Handles credential issuance and verification workflows
- **AccessControl**: Permission management and access control for protocol operations

### Frontend Stack ✅ **FULLY IMPLEMENTED**
- **React 18**: Modern React with hooks and context for state management
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Animation library for smooth, gamified interactions
- **Wagmi**: React hooks for Ethereum and Moca Chain integration
- **RainbowKit**: Wallet connection interface with multi-wallet support

### Integration ✅ **PRODUCTION READY**
- **AIR Kit SDK**: Moca's identity and credential management SDK for issuance and verification
- **Moca Chain**: Layer 1 blockchain optimized for identity and credential operations (Testnet: Chain ID 5151)
- **Incentive Layer**: On-chain reward distribution and reputation tracking system

## 🚀 Moca Chain Integration

### Network Configuration
- **Moca Testnet (Development)**: Chain ID 5151
  - RPC URL: `https://devnet-rpc.mocachain.org`
  - Explorer: `https://devnet-scan.mocachain.org`
  - Native Token: MOCA
  - Status: ✅ **ACTIVE & DEPLOYED**

### Smart Contract Deployment Status
**✅ Successfully Deployed on Moca Testnet (October 24, 2025)**

| Contract | Address | Status |
|----------|---------|---------|
| CredentialRegistry | `0x634b3cD5db670b9f104D4242621c4E200c6aDb4F` | ✅ Verified |
| RewardManager | `0x4212f573e7F456974e018001B2311f4402d2711B` | ✅ Verified |
| VerifierRegistry | `0x62f4eDAA371B5895ADA5fA2e5733f0447433b4C3` | ✅ Verified |
| AnalyticsModule | `0x9CC47525a6C2f3e915D44cA785c7B11dE164AF07` | ✅ Verified |
| CredentialIssuer | `0x4bC5D734A7BfDF126A9C076E7Ac5633173Cb3C92` | ✅ Verified |
| AccessControl | `0x2BAC3b9AAFdcEde12F7a7601E2A87FdE72CAdfF1` | ✅ Verified |

### Token Economics (MOCA)
- **Verification Reward**: 2.5 MOCA per verified credential
- **Verifier Fee**: 0.5 MOCA per verification (20% of reward)
- **Minimum Stake**: 100 MOCA for verifier registration
- **Slashing Rate**: 10% of stake for malicious behavior

## 🔧 AIR Kit SDK Integration

### Implementation Status ✅ **FULLY INTEGRATED**
Veyra Protocol leverages Moca Network's AIR Kit SDK for comprehensive identity and credential management:

### Core Features Implemented
- **DID Management**: Decentralized identifier generation and persistence
- **Verifiable Credentials**: Full VC lifecycle (issuance, storage, verification)
- **Verifiable Presentations**: VP creation with cryptographic proofs
- **Schema Management**: Support for multiple credential types and formats
- **JWT Authentication**: Secure API communication with AIR Kit services

### Technical Implementation
```javascript
// DID Generation and Management
const { did, publicKey, generateDID } = useDID()

// Verifiable Credential Operations
const { 
  credentials, 
  issueCredential, 
  verifyCredential, 
  revokeCredential 
} = useVerifiableCredentials()

// Verifiable Presentation Creation
const { 
  presentations, 
  createPresentation, 
  verifyPresentation 
} = useVerifiablePresentations()
```

### AIR Kit Configuration
- **Environment**: Sandbox (Development) / Production Ready
- **API Endpoint**: `https://developers.sandbox.air3.com`
- **Widget URL**: `https://widget.moca.network`
- **Authentication**: JWT-based secure communication
- **Storage**: Local persistence with blockchain verification

### Credential Types Supported
- **Education**: Academic degrees, certifications, courses
- **Employment**: Work history, professional certifications
- **Skills**: Technical skills, competencies, achievements
- **Identity**: KYC, government IDs, personal verification
- **Custom**: Extensible schema support for any credential type

### Integration Benefits
- **Seamless UX**: Native integration with Moca Network ecosystem
- **Interoperability**: Standards-compliant W3C Verifiable Credentials
- **Security**: Cryptographic proofs and blockchain anchoring
- **Scalability**: Optimized for high-volume credential operations

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control
- **MetaMask** or compatible Web3 wallet
- **Moca Chain Testnet** configuration in wallet

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/veyra-protocol.git
   cd veyra-protocol
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install smart contract dependencies
   cd contracts
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables**
   
   **Backend `.env` (in `/contracts` directory):**
   ```env
   # Moca Chain Configuration
   MOCA_TESTNET_RPC_URL=https://devnet-rpc.mocachain.org
   MOCA_TESTNET_PRIVATE_KEY=your_private_key_here
   MOCA_TESTNET_CHAIN_ID=5151
   
   # AIR Kit SDK Configuration (Backend)
   AIRKIT_PARTNER_ID=your_partner_id_here
   AIRKIT_ISSUER_DID=your_issuer_did_here
   AIRKIT_VERIFIER_DID=your_verifier_did_here
   AIRKIT_API_URL=https://developers.sandbox.air3.com
   AIRKIT_ENVIRONMENT=sandbox
   
   # Etherscan API (for contract verification)
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

   **Frontend `.env` (in `/frontend` directory):**
   ```env
   # Moca Chain Configuration (Testnet)
   VITE_MOCA_CHAIN_ID=5151
   VITE_MOCA_RPC_URL=https://devnet-rpc.mocachain.org
   VITE_MOCA_EXPLORER=https://devnet-scan.mocachain.org

   # Smart Contract Addresses (✅ DEPLOYED ON MOCA TESTNET)
   VITE_CREDENTIAL_REGISTRY_ADDRESS=0x634b3cD5db670b9f104D4242621c4E200c6aDb4F
   VITE_REWARD_MANAGER_ADDRESS=0x4212f573e7F456974e018001B2311f4402d2711B
   VITE_VERIFIER_REGISTRY_ADDRESS=0x62f4eDAA371B5895ADA5fA2e5733f0447433b4C3
   VITE_ANALYTICS_MODULE_ADDRESS=0x9CC47525a6C2f3e915D44cA785c7B11dE164AF07
   VITE_CREDENTIAL_ISSUER_ADDRESS=0x4bC5D734A7BfDF126A9C076E7Ac5633173Cb3C92
   VITE_ACCESS_CONTROL_ADDRESS=0x2BAC3b9AAFdcEde12F7a7601E2A87FdE72CAdfF1

   # AIR Kit SDK Configuration (Frontend)
   VITE_AIRKIT_PARTNER_ID=your_partner_id_here
   VITE_AIRKIT_ISSUER_DID=your_issuer_did_here
   VITE_AIRKIT_VERIFIER_DID=your_verifier_did_here
   VITE_AIRKIT_API_URL=https://developers.sandbox.air3.com
   VITE_AIRKIT_WIDGET_URL=https://widget.moca.network
   VITE_AIRKIT_ENVIRONMENT=sandbox

   # Application Configuration
   VITE_APP_NAME=Veyra Protocol
   VITE_APP_DESCRIPTION=Incentivized Credential Verification Protocol
   VITE_APP_URL=https://Veyra.network

   # WalletConnect Project ID
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   ```

4. **Add Moca Chain Testnet to Your Wallet**
   - **Network Name**: Moca Testnet
   - **RPC URL**: `https://devnet-rpc.mocachain.org`
   - **Chain ID**: `5151`
   - **Currency Symbol**: `MOCA`
   - **Block Explorer**: `https://devnet-scan.mocachain.org`

5. **Start the Development Environment**
   ```bash
   # Start the frontend development server
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Open [http://localhost:5173](http://localhost:5173) in your browser
   - Connect your wallet (MetaMask recommended)
   - Switch to Moca Testnet
   - Start exploring the Veyra Protocol!

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

## 📱 Frontend Features & Implementation Status

### ✅ **FULLY IMPLEMENTED PAGES**
- **🏠 Home Page**: Landing page with protocol overview and call-to-action
- **📊 Dashboard**: User analytics, credential overview, and reward tracking
- **🆔 My Identity**: DID management and identity verification status
- **🏆 My Credentials**: Personal credential portfolio with verification status
- **✅ Verification**: Credential verification interface for verifiers
- **💰 Verify & Earn**: Gamified verification process with MOCA rewards
- **🔐 Access Control**: Role-based access management and permissions
- **⚙️ Settings**: User preferences, notifications, and account management
- **ℹ️ About**: Protocol information and team details
- **💼 Careers**: Job opportunities and team expansion
- **🔒 Privacy Policy**: Data protection and privacy guidelines
- **📋 Terms of Service**: Legal terms and conditions
- **🏅 Credentials**: Public credential marketplace and discovery
- **👥 Verifiers**: Verifier directory and reputation system
- **🎁 Rewards**: Reward history and redemption options
- **🏆 Leaderboard**: Gamification with top users and verifiers

### ✅ **CORE COMPONENTS IMPLEMENTED**
- **🎨 Modern UI/UX**: TailwindCSS with responsive design and dark mode
- **🔗 Wallet Integration**: RainbowKit with multi-wallet support
- **📱 Mobile Responsive**: Optimized for all device sizes
- **🎭 Animations**: Framer Motion for smooth transitions
- **🔄 State Management**: Zustand for efficient state handling
- **🌐 Routing**: React Router with protected routes
- **📊 Data Visualization**: Charts and analytics dashboards
- **🔔 Notifications**: Toast notifications and alerts
- **🎮 Gamification**: Points, badges, and achievement system
- **🔍 Search & Filter**: Advanced filtering and search capabilities

### ✅ **BLOCKCHAIN INTEGRATION**
- **⛓️ Moca Chain**: Native integration with testnet deployment
- **💰 MOCA Token**: Reward distribution and staking mechanisms
- **📝 Smart Contracts**: Full contract interaction via Wagmi/Viem
- **🔐 Wallet Connect**: Seamless wallet connection and transaction signing
- **📊 Real-time Data**: Live blockchain data synchronization

### ✅ **AIR Kit SDK FEATURES**
- **🆔 DID Management**: Decentralized identity creation and persistence
- **📜 Credential Lifecycle**: Issue, verify, revoke, and present credentials
- **🔒 Cryptographic Proofs**: W3C compliant verifiable presentations
- **📋 Schema Support**: Multiple credential types and formats
- **🔑 JWT Authentication**: Secure API communication

5. **Access the Application**
   - Open [http://localhost:5173](http://localhost:5173) in your browser
   - Connect your wallet (MetaMask recommended)
   - Start earning rewards through credential verification!

## 🌐 Deployment

### Smart Contract Deployment

**✅ Current Deployment Status (Moca Testnet)**

The Credora Protocol contracts have been successfully deployed to Moca Testnet (Chain ID: 5151):

- **CredentialRegistry**: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- **RewardManager**: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`
- **VerifierRegistry**: `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9`
- **AnalyticsModule**: `0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9`
- **CredentialIssuer**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **AccessControl**: `0x5FC8d32690cc91D4c39d9d3abcBD16989F875707`

**Deployment Commands:**

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

### 🎯 Earning Rewards as a User

1. **Connect Wallet**
   - Navigate to the Veyra Protocol dashboard
   - Connect your Moca Chain compatible wallet
   - View your current reputation and reward balance

2. **Acquire Credentials**
   - Browse available credential types
   - Request credential issuance through AIR Kit
   - Submit credentials for verification by staked verifiers

3. **Track Progress**
   - Monitor your credential portfolio
   - View earned badges and milestones
   - Check your position on the leaderboard

### 💰 Becoming a Verifier

1. **Stake Tokens**
   - Navigate to "Become a Verifier"
   - Stake the required MOCA tokens
   - Confirm your verifier registration

2. **Verify Credentials**
   - Review submitted credentials in your verifier dashboard
   - Validate credentials using AIR Kit integration
   - Earn fees for each successful verification

3. **Build Reputation**
   - Maintain high accuracy in verification
   - Build your verifier reputation score
   - Earn higher fees with better reputation

### 🏆 Gamification Features

1. **Badges & Achievements**
   - Unlock badges for credential milestones
   - Complete achievement challenges
   - Showcase your accomplishments

2. **Leaderboards**
   - Compete with other users
   - View top verifiers by reputation
   - Track protocol-wide statistics

### 📊 Analytics Dashboard

1. **User Analytics**
   - View your credential acquisition history
   - Track reward earnings over time
   - Monitor reputation growth

2. **Verifier Analytics**
   - Review verification statistics
   - Track fee earnings and staking rewards
   - Monitor reputation trends

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
- ✅ Smart contract functionality (CredentialRegistry, RewardManager, VerifierRegistry)
- ✅ Incentive mechanisms and reward distribution
- ✅ Verifier staking and slashing logic
- ✅ Credential verification workflows
- ✅ Gamification features and analytics
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
1. Check existing [GitHub Issues](https://github.com/your-username/Veyra Protocol/issues)
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔮 Roadmap

### Current Phase: Veyra Protocol Launch

- **Incentive System**: Implement reward distribution and verifier fee mechanisms
- **Staking & Slashing**: Complete verifier staking logic with fraud protection
- **Gamification**: Build badges, leaderboards, and achievement systems
- **Analytics Dashboard**: Create comprehensive user and verifier analytics
- **AIR Kit Integration**: Full integration with credential issuance and verification

### Next Up (Short-Term Enhancements)

- **Advanced Reputation**: Multi-dimensional reputation scoring for verifiers
- **Dynamic Rewards**: Adaptive reward algorithms based on credential rarity and demand
- **Mobile App**: Native mobile application for iOS and Android
- **Cross-chain Support**: Expand to other EVM-compatible chains
- **API Marketplace**: Public APIs for third-party integrations

### Phase 1 (Q2 2024)
- ✅ Core credential verification protocol
- ✅ Basic incentive mechanisms
- ✅ Web interface with wallet integration
- 🔄 Verifier economy implementation

### Phase 2 (Q3 2024)
- 🔄 Advanced gamification features
- 🔄 Mobile application launch
- 🔄 Enterprise verifier partnerships
- 🔄 Cross-chain credential portability

### Phase 3 (Q4 2024)
- 🔄 Credential marketplace and trading
- 🔄 Advanced analytics and insights
- 🔄 Governance token and DAO features
- 🔄 Institutional adoption tools

## 🙏 Acknowledgments

- **Moca Network** for the blockchain infrastructure
- **AIR Kit SDK** for identity management tools
- **OpenZeppelin** for secure smart contract libraries
- **React Community** for the amazing ecosystem
- **All Contributors** who help improve this project

---

**Built with ❤️ for the incentivized future of credentials**

For more information, visit [Veyra.network](https://Veyra.network)