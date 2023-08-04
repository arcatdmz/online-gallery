import { FC } from "react";
import { List } from "semantic-ui-react";

import { NavigationListItem } from "./NavigationListItem";

interface NavigationListProps {
  path: string;
  data: { path: string; directory?: boolean }[];
}

export const NavigationList: FC<NavigationListProps> = ({ path, data }) => (
  <List relaxed selection>
    {data?.map(({ path: currentPath, directory }) => (
      <NavigationListItem
        key={currentPath}
        path={currentPath}
        parent={path}
        directory={directory}
      />
    ))}
  </List>
);
