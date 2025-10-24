# Credora Protocol

*"Earn. Verify. Trust. On-Chain."*

A decentralized, incentive-driven credential verification protocol built on Moca Chain. Credora rewards users for acquiring verified credentials and compensates verifiers for validating them, creating a trustless, gamified ecosystem for credential management.

## 🌟 Features

### 🎯 User Incentives
- **Earn Rewards**: Get on-chain rewards and reputation points for verified credentials
- **Gamified Experience**: Unlock badges, levels, and milestones through credential accumulation
- **Access Tiers**: Unlock dApp features and premium access based on credential achievements
- **Leaderboards**: Compete with other users and showcase your credential portfolio

### 💰 Verifier Economy
- **Stake & Earn**: Verifiers stake tokens to validate credentials and earn fees
- **Reputation System**: Build verifier reputation through reliable validation
- **Slashing Protection**: Fraud detection with automatic slashing for malicious behavior
- **Fee Distribution**: Transparent fee structure for each credential validation

### 🔐 Credential Management
- **AIR Kit Integration**: Seamless verifiable credential issuance and presentation
- **Smart Contract Automation**: Trustless, auditable, and on-chain credential operations
- **Multi-format Support**: Support for various credential types and schemas
- **Verifiable Presentations**: Generate VPs with JWS signatures and challenge verification

### 📊 Protocol Analytics
- **User Dashboard**: Track earned credentials, badges, reputation, and rewards
- **Verifier Dashboard**: Monitor staked tokens, verified credentials, fees, and reputation
- **Privacy-First Analytics**: Aggregate statistics without exposing personal information
- **Real-time Updates**: Live tracking of protocol activity and user progress

### 🔗 Modern Integration
- **QR & Deep Links**: Easy sharing and verification through QR codes and deep links
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Wallet Integration**: Seamless connection with RainbowKit and Wagmi

## Architecture

### Smart Contracts
- **CredentialRegistry**: Stores credential hashes, owners, and verification status
- **RewardManager**: Calculates and distributes rewards for users and fees for verifiers
- **VerifierRegistry**: Manages verifier staking, reputation, and slashing logic
- **AnalyticsModule**: Aggregates credential statistics for dashboards and leaderboards
- **AccessControl**: Permission management and access control (legacy support)

### Frontend Stack
- **React 18**: Modern React with hooks and context for state management
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Animation library for smooth, gamified interactions
- **Wagmi**: React hooks for Ethereum and Moca Chain integration
- **RainbowKit**: Wallet connection interface with multi-wallet support

### Integration
- **AIR Kit SDK**: Moca's identity and credential management SDK for issuance and verification
- **Moca Chain**: Layer 1 blockchain optimized for identity and credential operations
- **Incentive Layer**: On-chain reward distribution and reputation tracking system

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
   # Moca Devnet Configuration (for development & testing)
   MOCA_TESTNET_RPC_URL=https://devnet-rpc.mocachain.org
   MOCA_TESTNET_CHAIN_ID=5151
   MOCA_TESTNET_EXPLORER=https://devnet-scan.mocachain.org

   # Private Keys (DO NOT COMMIT TO VERSION CONTROL)
   DEPLOYER_PRIVATE_KEY=your_deployer_private_key_here
   ISSUER_PRIVATE_KEY=your_issuer_private_key_here

   # Moca Chain API
   MOCA_API_KEY=your_moca_api_key_here

   # AIR Kit SDK Configuration (Backend)
   AIRKIT_PARTNER_ID=your_partner_id_here
   AIRKIT_ISSUER_DID=your_issuer_did_here
   AIRKIT_VERIFIER_DID=your_verifier_did_here
   AIRKIT_PRIVATE_KEY=your_jwt_private_key_here
   AIRKIT_API_URL=https://developers.sandbox.air3.com
   AIRKIT_WIDGET_URL=https://widget.moca.network
   ```

   **Frontend `.env`:**
   ```env
   # Moca Chain Configuration (Devnet)
   VITE_MOCA_CHAIN_ID=5151
   VITE_MOCA_RPC_URL=https://devnet-rpc.mocachain.org
   VITE_MOCA_EXPLORER=https://devnet-scan.mocachain.org

   # Smart Contract Addresses (Update after deployment)
   VITE_IDENTITY_REGISTRY_ADDRESS=0x...
   VITE_CREDENTIAL_ISSUER_ADDRESS=0x...
   VITE_ACCESS_CONTROL_ADDRESS=0x...

   # AIR Kit SDK Configuration (Frontend)
   VITE_AIRKIT_PARTNER_ID=your_partner_id_here
   VITE_AIRKIT_ISSUER_DID=your_issuer_did_here
   VITE_AIRKIT_VERIFIER_DID=your_verifier_did_here
   VITE_AIRKIT_API_URL=https://developers.sandbox.air3.com
   VITE_AIRKIT_WIDGET_URL=https://widget.moca.network
   VITE_AIRKIT_ENVIRONMENT=sandbox

   # Application Configuration
   VITE_APP_NAME=Credora Protocol
   VITE_APP_DESCRIPTION=Incentivized Credential Verification Protocol
   VITE_APP_URL=https://credora.network

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
   - Start earning rewards through credential verification!

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

### 🎯 Earning Rewards as a User

1. **Connect Wallet**
   - Navigate to the Credora Protocol dashboard
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
1. Check existing [GitHub Issues](https://github.com/your-username/credora-protocol/issues)
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔮 Roadmap

### Current Phase: Credora Protocol Launch

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

For more information, visit [credora.network](https://credora.network)