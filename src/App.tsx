import { FC, useEffect, useState } from "react";
import { Divider } from "semantic-ui-react";

import "./App.css";

import { NavigationSegment } from "./NavigationSegment";

const initialPath = ".";

const App: FC = () => {
  const [path, setPath] = useState(initialPath);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    setPath(searchParams.get("path") || initialPath);
  }, []);

  useEffect(() => {
    document.title = `資料ビューワ${
      path && path.length > 2 ? `: ${path.substring(2)}` : ""
    }`;
  }, [path]);

  return (
    <div className="app">
      <NavigationSegment path={path} />
      <Divider />
      <footer>&copy; Jun Kato 2023</footer>
    </div>
  );
};

export default App;
