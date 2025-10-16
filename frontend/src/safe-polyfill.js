// Safe wallet polyfill to prevent runtime errors
// This creates empty modules for Safe packages that wagmi tries to load

export const SafeAppProvider = class {
  constructor() {
    throw new Error('Safe wallet is not supported in this build');
  }
};

export default class SafeAppsSDK {
  constructor() {
    throw new Error('Safe wallet is not supported in this build');
  }
  
  safe = {
    getInfo: () => Promise.resolve(null)
  };
};