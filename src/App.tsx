import { FC, useEffect, useMemo, useState } from "react";
import { Divider } from "semantic-ui-react";

import "./App.css";

import { NavigationSegment } from "./NavigationSegment";
import { NavigatorContext } from "./NavigatorContext";
import { isFile } from "./logic";
import { CSVExportButton } from "./CSVExportButton";

const initialPath = ".";

const App: FC = () => {
  const [path, setPath] = useState(initialPath);
  const [lastFilePath, setLastFilePath] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const revalidate = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const path = searchParams.get("path") || initialPath;

      setPath(path);
      if (isFile(path)) {
        setLastFilePath(path);
      }
    };

    window.addEventListener("popstate", revalidate);
    revalidate();

    return () => {
      window.removeEventListener("popstate", revalidate);
    };
  }, []);

  useEffect(() => {
    window.document.title = `資料ビューワ${
      path && path.length > 2 ? `: ${path.substring(2)}` : ""
    }`;
  }, [path]);

  const doSetPath = useMemo(
    () => (path: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set("path", path);
      window.history.pushState({}, "", url);

      setPath(path);
      if (isFile(path)) {
        setLastFilePath(path);
      }
    },
    [setPath]
  );

  return (
    <div className="app">
      <NavigatorContext.Provider value={{ setPath: doSetPath }}>
        <NavigationSegment path={path} lastFilePath={lastFilePath} />
      </NavigatorContext.Provider>
      <Divider />
      <footer>
        <CSVExportButton dirPath={path} disabled={lastFilePath === path} />
        <Divider hidden />
        <p>&copy; Jun Kato 2023</p>
      </footer>
    </div>
  );
};

export default App;
