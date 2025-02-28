import {create} from "zustand";
import {persist} from "zustand/middleware";

type TokenStore = {
    token: boolean,
    setToken: (value: boolean) => void;
}

/**
 * This store also uses localStorage for persisting the data.
 *
 * Since token is saved in HttpOnly Cookie, this token store just saves a boolean value to tell
 * components that token exists.
 */
export const useTokenStore = create<TokenStore>()(
    persist(
        (set) => ({
            token: false,
            setToken: (value: boolean) => set({token: value}),
        }),
        {
            name: 'token', // Name of the item in the localStorage (must be unique).
        }
    )
);
