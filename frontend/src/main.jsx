import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Wagmi and RainbowKit imports
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Chain configuration
const mocaChain = {
  id: parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '7001'),
  name: 'Moca Chain',
  network: 'moca',
  nativeCurrency: {
    decimals: 18,
    name: 'MOCA',
    symbol: 'MOCA',
  },
  rpcUrls: {
    public: { http: [import.meta.env.VITE_MOCA_RPC_URL || 'https://devnet-rpc.mocachain.org'] },
    default: { http: [import.meta.env.VITE_MOCA_RPC_URL || 'https://devnet-rpc.mocachain.org'] },
  },
  blockExplorers: {
    default: { name: 'Moca Explorer', url: import.meta.env.VITE_MOCA_EXPLORER || 'https://testnet-scan.mechain.tech' },
  },
}

const mocaTestnet = {
  id: parseInt(import.meta.env.VITE_MOCA_TESTNET_CHAIN_ID || '7001'),
  name: 'Moca Testnet',
  network: 'moca-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MOCA',
    symbol: 'MOCA',
  },
  rpcUrls: {
    public: { http: [import.meta.env.VITE_MOCA_TESTNET_RPC_URL || 'https://devnet-rpc.mocachain.org'] },
    default: { http: [import.meta.env.VITE_MOCA_TESTNET_RPC_URL || 'https://devnet-rpc.mocachain.org'] },
  },
  blockExplorers: {
    default: { name: 'Moca Testnet Explorer', url: 'https://testnet-scan.mechain.tech' },
  },
  testnet: true,
}

const { chains, publicClient } = configureChains(
  [mocaChain, mocaTestnet],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: import.meta.env.VITE_APP_NAME || 'MocaID Vault',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your_project_id',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme="light">
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>,
)