import { useCallback, useReducer, useRef } from 'react';

type AuthState = {
  book?: string;
};

export default function useAuthModel() {
  const state = useRef<AuthState>({});
  const [, forceRender] = useReducer((s) => s + 1, 0);

  return {
    state: state.current,
  };
}
