import { FC, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { List, Loader, Segment } from "semantic-ui-react";

import styles from "./NavigationList.module.css";

import { BasePathContext } from "./BasePathContext";
import { NavigationBreadcrumb } from "./NavigationBreadcrumb";

interface NavigationListProps {
  path: string;
}

export const NavigationList: FC<NavigationListProps> = ({ path }) => {
  const { appPath, storagePath } = useContext(BasePathContext);

  const { isLoading, error, data } = useQuery({
    queryKey: path.split("/"),
    queryFn: () =>
      fetch(`${storagePath}${path}/index.json`).then(
        res => res.json() as Promise<{ path: string; directory?: boolean }[]>
      )
  });

  const numFolders = useMemo(
    () => data?.filter(e => !!e.directory).length || 0,
    [data]
  );
  const numFiles = (data?.length || 0) - numFolders;

  return (
    <Segment>
      <NavigationBreadcrumb path={path} />
      {isLoading ? (
        <p className={styles.loading}>
          <Loader active />
        </p>
      ) : error ? (
        <p className={styles.error}>
          {(error as { message: string })["message"]}
        </p>
      ) : (
        <>
          <List relaxed selection>
            {data?.map(({ path, directory }) => (
              <List.Item
                key={path}
                icon={directory ? "folder" : "file"}
                content={path}
                as="a"
                href={
                  directory
                    ? `${appPath}?path=${encodeURIComponent(path)}`
                    : `${storagePath}${path}`
                }
              />
            ))}
          </List>
          <p className={styles.meta}>
            全 <strong>{numFolders}</strong> フォルダ,{" "}
            <strong>{numFiles}</strong> ファイル
          </p>
        </>
      )}
    </Segment>
  );
};
