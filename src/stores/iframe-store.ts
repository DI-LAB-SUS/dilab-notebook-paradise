import {create} from "zustand";
import {persist} from "zustand/middleware";

interface IframeOptions {
    open: boolean;
    url: string;
}

type IframeStore = {
    iframeOpts: IframeOptions;
    setIFrameOpts: (value: IframeOptions) => void;
}

/**
 * This store also uses localStorage for persisting the data.
 */
export const useIframeStore = create<IframeStore>()(
    persist(
        (set) => ({
            iframeOpts: {open: false, url: ''},
            setIFrameOpts: (value: IframeOptions) => set({iframeOpts: value}),
        }),
        {
            name: 'IframeOpts' // Name of the item in the localStorage (must be unique).
        }
    )
);
