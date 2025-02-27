import {create} from "zustand";
import {persist} from "zustand/middleware";

type TokenStore = {
    token: string | null,
    setToken: (value: string | null) => void;
}

/**
 * This store also uses localStorage for persisting the data.
 */
export const useTokenStore = create<TokenStore>()(
    persist(
        (set) => ({
            token: null,
            setToken: (value: string | null) => set({token: value}),
        }),
        {
            name: 'token', // Name of the item in the localStorage (must be unique).
        }
    )
);
