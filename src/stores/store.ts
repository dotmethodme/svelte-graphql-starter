import { derived } from "svelte/store";
import type { UserToken } from "../generated/graphql";
import { localStore } from "./localstorage";

export const userToken = localStore<string>("userToken", null);
export const decodedUserToken = localStore<UserToken>("decodedUserToken", null);

export const isLoggedIn = derived(userToken, ($a) => $a && $a != null);
