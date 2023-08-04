import { FC, useContext } from "react";
import { List } from "semantic-ui-react";

import { BasePathContext } from "./BasePathContext";

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
  const { appPath, storagePath } = useContext(BasePathContext);
  const relPath = path.substring(parent.length + 1);
  return (
    <List.Item
      key={path}
      icon={directory ? "folder" : "file"}
      content={relPath}
      as="a"
      href={
        directory
          ? `${appPath}?path=${encodeURIComponent(path)}`
          : `${storagePath}${path}`
      }
    />
  );
};
