#  Veyra Deployment Guide - Netlify

This guide provides step-by-step instructions for deploying the  Veyra application to Netlify.

## Prerequisites

- A Netlify account (free tier available)
- GitHub repository with your  Veyra code
- Deployed smart contracts on Moca Testnet
- WalletConnect Project ID

## Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/ Veyra)

## Manual Deployment Steps

### 1. Prepare Your Repository

Ensure your repository contains:
- ✅ `netlify.toml` configuration file
- ✅ Updated `frontend/package.json` with build scripts
- ✅ `frontend/.env.example` with all required variables

### 2. Connect to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, Bitbucket)
4. Select your  Veyra repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### 3. Environment Variables Setup

In your Netlify site dashboard, go to **Site settings > Environment variables** and add:

#### Required Variables
```bash
# Moca Chain Configuration - Devnet (Development & Testing)
VITE_MOCA_CHAIN_ID=5151
VITE_MOCA_RPC_URL=https://devnet-rpc.mocachain.org

# Smart Contract Addresses (from your deployment)
VITE_IDENTITY_REGISTRY_ADDRESS=0xB6EE67F0c15f949433d0e484F60f70f1828458e3
VITE_CREDENTIAL_ISSUER_ADDRESS=0x72CA2541A705468368F9474fB419Defd002EC8af
VITE_ACCESS_CONTROL_ADDRESS=0xF565086417Bf8ba76e4FaFC9F0088818eA027539

# AIR Kit SDK Configuration - Sandbox Environment (for development & testing)
VITE_AIRKIT_PARTNER_ID=your_airkit_partner_id
VITE_AIRKIT_ISSUER_DID=your_airkit_issuer_did
VITE_AIRKIT_VERIFIER_DID=your_airkit_verifier_did
VITE_AIRKIT_API_URL=https://developers.sandbox.air3.com
VITE_AIRKIT_WIDGET_URL=https://widget.moca.network

# App Configuration
VITE_APP_NAME= Veyra
VITE_APP_DESCRIPTION=Decentralized Identity Management on Moca Chain
VITE_APP_URL=https://your-site-name.netlify.app

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

#### Build Environment Variables
```bash
NODE_VERSION=18
NPM_VERSION=9
NODE_ENV=production
```

### 4. Get WalletConnect Project ID

1. Visit [Reown Cloud](https://cloud.reown.com/sign-in) (formerly WalletConnect Cloud)
2. Create a free account or sign in
3. Create a new project
4. Copy your Project ID
5. Add it to Netlify environment variables as `VITE_WALLETCONNECT_PROJECT_ID`

### 5. Deploy

1. Click "Deploy site" in Netlify
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be available at `https://random-name.netlify.app`

### 6. Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings > Domain management**
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Update `VITE_APP_URL` environment variable with your custom domain

## Build Configuration Details

### netlify.toml Features

- **SPA Routing**: Redirects all routes to `index.html` for client-side routing
- **Security Headers**: Includes security headers for production
- **Caching**: Optimized caching for static assets
- **Node.js Environment**: Configured for Node 18 and npm 9

### Build Optimizations

- **Code Splitting**: Automatic chunking for better performance
- **Minification**: Terser minification for production builds
- **Source Maps**: Disabled in production for smaller bundle size
- **Tree Shaking**: Removes unused code automatically

## Troubleshooting

### Common Issues

1. **Build Fails with "Module not found"**
   - Ensure all dependencies are in `package.json`
   - Check import paths are correct

2. **Environment Variables Not Working**
   - Verify all variables start with `VITE_`
   - Check spelling and case sensitivity
   - Redeploy after adding variables

3. **WalletConnect Errors**
   - Verify your Project ID is correct
   - Check domain allowlist in Reown Cloud dashboard

4. **Smart Contract Connection Issues**
   - Verify contract addresses are correct
   - Ensure contracts are deployed on Moca Testnet (Chain ID: 5151)

### Build Logs

Check build logs in Netlify dashboard under **Deploys** tab for detailed error information.

## Performance Optimization

### Recommended Settings

- Enable **Asset optimization** in Netlify
- Configure **Branch deploys** for staging
- Set up **Deploy previews** for pull requests
- Enable **Form detection** if using contact forms

### Monitoring

- Use Netlify Analytics for traffic insights
- Monitor Core Web Vitals in production
- Set up error tracking (Sentry, LogRocket, etc.)

## Security Considerations

- Environment variables are build-time only (safe for frontend)
- WalletConnect Project ID can be public (it's expected)
- Never commit actual `.env` files to repository
- Use branch protection rules in GitHub

## Support

For deployment issues:
- Check [Netlify Documentation](https://docs.netlify.com/)
- Review build logs for specific errors
- Ensure all environment variables are properly set

For application issues:
- Verify smart contract addresses
- Check Moca Testnet connectivity
- Validate WalletConnect configuration