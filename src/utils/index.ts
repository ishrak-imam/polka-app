import type {Network} from 'context/Network';
import {checkAddress} from '@polkadot/util-crypto';

export const ADDRESS_PREFIX_POLKADOT = 0;
export const ADDRESS_PREFIX_KUSAMA = 2;

export const isAddressValid = (network: Network, address: string) => {
  switch (network.key) {
    case 'polkadot':
      return checkAddress(address, ADDRESS_PREFIX_POLKADOT)[0];
    case 'kusama':
      return checkAddress(address, ADDRESS_PREFIX_KUSAMA)[0];
    default:
      return false;
  }
};
