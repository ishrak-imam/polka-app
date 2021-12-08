import React, {EffectCallback} from 'react';

export function useMountEffect(func: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(func, []);
}
