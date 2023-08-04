import { createContext } from "react";

interface BasePathIface {
  appPath: string | null;
  storagePath: string | null;
}

export const BasePathContext = createContext<BasePathIface>({
  appPath: null,
  storagePath: null
});
