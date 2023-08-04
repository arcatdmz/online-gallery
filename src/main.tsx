import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "semantic-ui-css/semantic.min.css";
import "./main.css";
import { BasePathContext } from "./BasePathContext.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BasePathContext.Provider
        value={{
          // appPath: "https://digitalmuseum.jp/etc/tachibana/",
          appPath: "http://localhost:5173/",
          storagePath: "https://digitalmuseum.jp/etc/tachibana/scan/"
        }}
      >
        <App />
      </BasePathContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
