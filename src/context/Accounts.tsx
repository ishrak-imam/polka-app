import React from 'react';
import {SupportedNetwork, useNetwork} from './Network';
import {usePersistedState} from 'hooks/usePersistedState';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View, Platform, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import {decodeAddress} from '@polkadot/keyring';
import {u8aToHex} from '@polkadot/util';
import {LoadingView} from 'components/LoadingView';

type PersistedAccount = {
  encoded: string;
  encoding: {
    content: string[];
  };
  type: string[];
  version: string;
  address: string;
  meta: {
    name: string;
    network: SupportedNetwork;
    isFavorite: boolean;
    isExternal: boolean;
    whenCreated: number;
  };
};

type PersistedAccounts = Record<string, PersistedAccount>;

export type Account = {
  address: string;
  name: string;
  isFavorite: boolean;
  isExternal: boolean;
  network: SupportedNetwork;
};

type AddAccountPayload = {
  mnemonic: string;
  password: string;
  name: string;
  network: SupportedNetwork;
  isFavorite: boolean;
  isExternal: boolean;
};

export type AddExternalAccountPayload = {
  address: string;
  network: string;
  isFavorite: boolean;
};

type AccountsContext = {
  accounts: Account[];
  setCallback: (cb: (data: any) => void) => void;
  generateMnemonic: () => void;
  createAccount: (mnemonic: string) => void;
  addAccount: (payload: AddAccountPayload) => void;
  addExternalAccount: (payload: AddExternalAccountPayload) => void;
  toggleFavorite: (address: string) => void;
};

const AccountsContext = React.createContext<AccountsContext>({
  accounts: [],
  setCallback: () => undefined,
  generateMnemonic: () => undefined,
  createAccount: () => undefined,
  addAccount: () => undefined,
  addExternalAccount: () => undefined,
  toggleFavorite: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

function addressToHex(address: string): string {
  return u8aToHex(decodeAddress(address, true));
}

async function loadHtml(setHtml: (html: string) => void) {
  const html =
    Platform.OS === 'android'
      ? await RNFS.readFileAssets('keyring.html', 'utf8')
      : await RNFS.readFile(`${RNFS.MainBundlePath}/dist/keyring.html`, 'utf8');
  setHtml(html);
}

export function AccountsProvider({children}: PropTypes) {
  const {currentNetwork} = useNetwork();
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [persistedAccounts, setPersistedAccounts] =
    usePersistedState<PersistedAccounts>('accounts', {});

  const prepareAccounts = (keyringAccounts: any) => {
    setAccounts(
      keyringAccounts.map((account: any) => {
        const {
          address,
          meta: {name, isExternal, isFavorite, network},
        } = account;
        return {
          address: address,
          name: name,
          isFavorite: Boolean(isFavorite),
          isExternal: Boolean(isExternal),
          network: network,
        };
      }),
    );
  };

  const rnPersistAccounts = (account: any) => {
    setPersistedAccounts({
      ...persistedAccounts,
      [`account:${addressToHex(account.address)}`]: account,
    });
  };

  const toggleFavoriteRnPersistedAccount = (address: string) => {
    const key = `account:${addressToHex(address)}`;
    setPersistedAccounts({
      ...persistedAccounts,
      [key]: {
        ...persistedAccounts[key],
        meta: {
          ...persistedAccounts[key].meta,
          isFavorite: !persistedAccounts[key].meta.isFavorite
        }
      },
    })
  }

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    const {type, payload} = data;

    switch (type) {
      case 'GET_PAIRS': {
        prepareAccounts(payload.pairs);
        break;
      }

      case 'ADD_ACCOUNT':
      case 'ADD_EXTERNAL_ACCOUNT': {
        rnPersistAccounts(payload.account);
        getPairs();
        break;
      }

      case 'TOGGLE_FAVORITE': {
        getPairs();
        toggleFavoriteRnPersistedAccount(payload.address)
      }
    }

    callback(data);
  };

  const webviewRef = React.useRef<any>();
  const [html, setHtml] = React.useState('');
  const [isWebviewLoaded, setIsWebviewLoaded] = React.useState(false);
  loadHtml(setHtml);

  // to pass webview onMessage data to child components
  let callback: (data: any) => void = () => ({});
  const setCallback = (cb: (data: any) => void) => {
    callback = cb;
  };

  const initWebviewStore = () => {
    Object.keys(persistedAccounts).forEach(key => {
      webviewRef.current.postMessage(
        JSON.stringify({
          type: 'INIT_STORE',
          payload: {
            key,
            value: persistedAccounts[key],
          },
        }),
      );
    });
  };

  const initKeyring = () => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'INIT_KEYRING',
      }),
    );
  };

  const setSS58Format = (ss58Format: number) => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'SET_SS58_FORMAT',
        payload: {ss58Format},
      }),
    );
  };

  const getPairs = () => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'GET_PAIRS',
      }),
    );
  };

  const generateMnemonic = () => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'GENERATE_MNEMONIC',
      }),
    );
  };

  const createAccount = (mnemonic: string) => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'CREATE_ACCOUNT',
        payload: {mnemonic},
      }),
    );
  };

  const addAccount = (payload: AddAccountPayload) => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'ADD_ACCOUNT',
        payload,
      }),
    );
  };

  const addExternalAccount = (payload: AddExternalAccountPayload) => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'ADD_EXTERNAL_ACCOUNT',
        payload,
      }),
    );
  };

  const toggleFavorite = (address: string) => {
    webviewRef.current.postMessage(
      JSON.stringify({
        type: 'TOGGLE_FAVORITE',
        payload: {address},
      }),
    );
  };

  // init
  React.useEffect(() => {
    if (isWebviewLoaded) {
      initWebviewStore();
      initKeyring();
      setSS58Format(currentNetwork.ss58Format);
      getPairs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebviewLoaded]);

  // set SS58 format
  React.useEffect(() => {
    if (isWebviewLoaded) {
      setSS58Format(currentNetwork.ss58Format);
    }
  }, [isWebviewLoaded, currentNetwork]);

  return (
    <>
      {html ? (
        <View style={styles.webview}>
          <WebView
            ref={webviewRef}
            onMessage={onMessage}
            onLoadEnd={() => setIsWebviewLoaded(true)}
            originWhitelist={['*']}
            source={{html}}
          />
        </View>
      ) : null}
      {isWebviewLoaded ? (
        <AccountsContext.Provider
          value={{
            accounts,
            setCallback,
            generateMnemonic,
            createAccount,
            addAccount,
            addExternalAccount,
            toggleFavorite,
          }}>
          {children}
        </AccountsContext.Provider>
      ) : (
        <LoadingView />
      )}
    </>
  );
}

export function useAccounts() {
  const context = React.useContext(AccountsContext);

  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }

  return context;
}

const styles = StyleSheet.create({
  webview: {
    height: 0,
  },
});
