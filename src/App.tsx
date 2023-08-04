import { FC, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";

import "./App.css";

import { NavigationList } from "./NavigationList";

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

  return (
    <div className="app">
      <Container>
        <NavigationList path={path} />
      </Container>
    </div>
  );
};

export default App;
