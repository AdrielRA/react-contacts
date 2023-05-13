import React, { useEffect, useState } from "react";
import { decryptData, encryptData } from "utils/crypto";
const SALT = import.meta.env.VITE_TEST_VAR;

export const usePersistedState = <T>(
  key: string,
  initialState: T,
  encrypt = false,
) => {
  const [state, setState] = useState<T>(() => {
    let storageValue = localStorage.getItem(key);
    if (storageValue && encrypt && SALT) {
      storageValue = decryptData(storageValue, SALT);
    }

    try {
      if (storageValue) {
        return JSON.parse(storageValue);
      }
    } catch (e) {
      // ignore
    }
    return initialState;
  });

  useEffect(() => {
    if (state === undefined) {
      localStorage.removeItem(key);
      return;
    }
    let storageValue = JSON.stringify(state);
    if (encrypt && SALT) {
      storageValue = encryptData(storageValue, SALT);
    }
    localStorage.setItem(key, storageValue);
  }, [encrypt, key, state]);

  return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default usePersistedState;
