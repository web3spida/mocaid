import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Wagmi and RainbowKit imports
import '@rainbow-me/rainbowkit/styles.css'
import { connectorsForWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, walletConnectWallet, coinbaseWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Chain configuration (single devnet chain)
const CHAIN_ID = parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '5151')
const RPC_URL = import.meta.env.VITE_MOCA_RPC_URL || import.meta.env.VITE_MOCA_TESTNET_RPC_URL || 'https://devnet-rpc.mocachain.org'

const mocaDevnet = {
  id: CHAIN_ID,
  name: 'Moca Testnet',
  network: 'moca-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MOCA',
    symbol: 'MOCA',
  },
  rpcUrls: {
    public: { http: [RPC_URL] },
    default: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'Moca Testnet Explorer', url: import.meta.env.VITE_MOCA_EXPLORER || 'https://devnet-scan.mocachain.org' },
  },
  testnet: true,
}

const { chains, publicClient } = configureChains([mocaDevnet], [publicProvider()])

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id-for-development', chains }),
      walletConnectWallet({ projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id-for-development', chains }),
      coinbaseWallet({ appName: import.meta.env.VITE_APP_NAME || ' Veyra Vault', chains }),
    ],
  },
])

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
        <RainbowKitProvider chains={chains} theme={lightTheme()}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>,
)