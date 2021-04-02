import { writable } from "svelte/store";
import { isServer } from "../utils";

export function localStore<T>(key: string, initVal: T) {
  if (isServer()) return;

  const toString = (value: T) => JSON.stringify(value, null, 2);
  const toObj = JSON.parse;

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(initVal));
  }

  const saved = toObj(localStorage.getItem(key));

  const { subscribe, set, update } = writable<T>(saved);

  return {
    subscribe,
    set: (value: T) => {
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
  };
}
