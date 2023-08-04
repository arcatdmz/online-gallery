import { FC, useEffect, useMemo, useState } from "react";
import { Divider } from "semantic-ui-react";

import "./App.css";

import { NavigationSegment } from "./NavigationSegment";
import { NavigatorContext } from "./NavigatorContext";

const initialPath = ".";

const App: FC = () => {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const revalidate = () => {
      const searchParams = new URLSearchParams(window.location.search);
      setPath(searchParams.get("path") || initialPath);
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
    },
    [setPath]
  );

  return (
    <div className="app">
      <NavigatorContext.Provider value={{ setPath: doSetPath }}>
        <NavigationSegment path={path} />
      </NavigatorContext.Provider>
      <Divider />
      <footer>&copy; Jun Kato 2023</footer>
    </div>
  );
};

export default App;
