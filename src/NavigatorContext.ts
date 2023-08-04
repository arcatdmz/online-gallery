import { createContext } from "react";

interface NavigatorIface {
  setPath: ((path: string) => void) | null;
}

export const NavigatorContext = createContext<NavigatorIface>({
  setPath: null
});
