import React from 'react';
import {ApiPromise, WsProvider} from '@polkadot/api';
import {useNetwork} from './Network';

type ApiStatus = 'unknown' | 'connected' | 'disconnected' | 'ready';

type ApiContext = {
  status: ApiStatus;
  inProgress: boolean;
  api?: ApiPromise;
  wsConnectionIndex: number;
  reconnect: () => void;
};

const initialState: ApiContext = {
  status: 'unknown',
  inProgress: false,
  api: undefined,
  wsConnectionIndex: 0,
  reconnect: () => ({}),
};

const ApiContext = React.createContext<ApiContext>(initialState);

export function ApiProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {currentNetwork} = useNetwork();

  const wsAddress = currentNetwork.ws[state.wsConnectionIndex];

  React.useEffect(() => {
    if (!wsAddress) {
      return;
    }

    const provider = new WsProvider(wsAddress, false);
    const apiPromise = new ApiPromise({provider});
    apiPromise.connect();

    dispatch({type: 'CONNECT'});

    function handleConnect() {
      console.log('ChainApiContext: Api connected');
      dispatch({type: 'ON_CONNECT'});
    }

    function handleReady() {
      console.log('ChainApiContext: Api ready at', wsAddress);
      dispatch({
        type: 'ON_READY',
        payload: apiPromise,
      });
    }

    function handleDisconnect() {
      console.log('ChainApiContext: Api disconnected', wsAddress);
      dispatch({type: 'ON_DISCONNECT'});
    }

    function handleError(error: unknown) {
      console.log('ChainApiContext: Api error at', wsAddress, error);
      dispatch({type: 'ON_ERROR'});
    }

    apiPromise.on('connected', handleConnect);
    apiPromise.on('ready', handleReady);
    apiPromise.on('disconnected', handleDisconnect);
    apiPromise.on('error', handleError);

    return () => {
      apiPromise.off('connected', handleConnect);
      apiPromise.off('ready', handleReady);
      apiPromise.off('disconnected', handleDisconnect);
      apiPromise.off('error', handleError);
    };
  }, [currentNetwork, wsAddress]);

  return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = React.useContext(ApiContext);

  if (!context) {
    throw new Error('useApi must be used within a ApiProvider');
  }

  return context;
}

type Action =
  | {type: 'ON_CONNECT'}
  | {type: 'CONNECT'}
  | {type: 'ON_READY'; payload: ApiPromise}
  | {type: 'ON_DISCONNECT'}
  | {type: 'ON_ERROR'}
  | {type: 'SET_WS_CONNECTION_INDEX'; payload: number};

function reducer(state: ApiContext = initialState, action: Action): ApiContext {
  switch (action.type) {
    case 'CONNECT':
      return {...state, inProgress: true, status: 'unknown'};
    case 'ON_CONNECT':
      return {...state, status: 'connected'};
    case 'ON_DISCONNECT':
    case 'ON_ERROR':
      return {...state, status: 'disconnected', inProgress: false};
    case 'ON_READY':
      return {
        ...state,
        status: 'ready',
        inProgress: false,
        api: action.payload,
      };

    case 'SET_WS_CONNECTION_INDEX':
      return {...state, wsConnectionIndex: action.payload};

    default:
      return state;
  }
}
