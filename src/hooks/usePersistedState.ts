import {useState, useCallback} from 'react';
import {setItem, getItem} from 'service/PersistedObjectStorage';

export type PersistedStateKey = 'network' | 'accounts' | 'theme' | 'selected_push_topics';

export function usePersistedState<T>(key: PersistedStateKey): [T | undefined, (newState: T) => void];
export function usePersistedState<T>(key: PersistedStateKey, initialState: T): [T, (newState: T) => void];

export function usePersistedState<T>(
  key: PersistedStateKey,
  initialState?: T,
): [state: T | undefined, setState: (data: T) => void] {
  const [state, setState] = useState(() => getItem<T>(key) ?? initialState);

  const persistState = useCallback(
    (newState: T) => {
      try {
        setState(newState);
        setItem(key, newState);
      } catch (e) {
        console.log(`Error setting ${key} to AsyncStorage`, e);
      }
    },
    [key],
  );

  return [state, persistState];
}
