import { FC, MouseEvent, useCallback, useContext } from "react";
import { List } from "semantic-ui-react";

import { BasePathContext } from "./BasePathContext";
import { NavigatorContext } from "./NavigatorContext";

interface NavigationListItemProps {
  path: string;
  parent: string;
  directory?: boolean;
}

export const NavigationListItem: FC<NavigationListItemProps> = ({
  path,
  parent,
  directory
}) => {
  const { appPath } = useContext(BasePathContext);
  const { setPath } = useContext(NavigatorContext);

  const relPath = path.substring(parent.length + 1);

  const handleClick = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault();
      setPath && setPath(path);
      return false;
    },
    [setPath, path]
  );

  return (
    <List.Item
      key={path}
      icon={directory ? "folder" : "file"}
      content={relPath}
      as="a"
      href={`${appPath}?path=${encodeURIComponent(path)}`}
      onClick={handleClick}
    />
  );
};
