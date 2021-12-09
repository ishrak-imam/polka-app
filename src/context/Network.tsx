import React from 'react';
import {noop} from 'lodash';
import {usePersistedState} from 'hooks/usePersistedState';

export type SupportedNetwork = 'polkadot' | 'kusama';

export type Network = {
  name: string;
  key: SupportedNetwork;
  ws: string[];
  isTestnet?: boolean;
  color?: string;
  ss58Format: number;
};

const PolkadotNetwork: Network = {
  name: 'Polkadot',
  key: 'polkadot',
  ws: ['wss://rpc.polkadot.io'],
  color: '#800000',
  ss58Format: 0,
};

const KusamaNetwork: Network = {
  name: 'Kusama',
  key: 'kusama',
  ws: ['wss://kusama.api.onfinality.io/public-ws'],
  color: '#e6194B',
  ss58Format: 2,
};

const availableNetworks = [PolkadotNetwork, KusamaNetwork];

type NetworkContext = {
  currentNetwork: Network;
  availableNetworks: Network[];
  select: (network: Network) => void;
};

const NetworkContext = React.createContext<NetworkContext>({
  currentNetwork: PolkadotNetwork,
  availableNetworks: availableNetworks,
  select: noop,
});

type PropTypes = {
  children: React.ReactNode;
};

export function NetworkProvider({children}: PropTypes) {
  const [currentNetwork, setCurrentNetwork] = usePersistedState<Network>(
    'network',
    PolkadotNetwork,
  );

  const value = React.useMemo(
    () => ({currentNetwork, availableNetworks, select: setCurrentNetwork}),
    [currentNetwork, setCurrentNetwork],
  );

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = React.useContext(NetworkContext);

  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }

  return context;
}
