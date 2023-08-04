import { useQuery } from "@tanstack/react-query";
import { FC, useContext, useMemo } from "react";
import { Loader, Portal, Segment } from "semantic-ui-react";

import styles from "./NavigationSegment.module.css";

import { BasePathContext } from "./BasePathContext";
import { NavigationBreadcrumb } from "./NavigationBreadcrumb";
import { NavigationList } from "./NavigationList";
import { NavigationThumbnails } from "./NavigationThumbnails";

interface NavigationSegmentProps {
  path: string;
}

export const NavigationSegment: FC<NavigationSegmentProps> = ({ path }) => {
  const { storagePath } = useContext(BasePathContext);

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
      <Portal open>
        <NavigationBreadcrumb path={path} attached="fixed" />
      </Portal>
      <NavigationBreadcrumb path={path} />
      {isLoading ? (
        <p className={styles.loading}>
          <Loader active />
        </p>
      ) : error || !data ? (
        <p className={styles.error}>データが取得できませんでした。</p>
      ) : (
        <>
          {numFolders <= 0 ? (
            <NavigationThumbnails path={path} data={data} />
          ) : (
            <NavigationList path={path} data={data} />
          )}
          <p className={styles.meta}>
            全 <strong>{numFolders}</strong> フォルダ,{" "}
            <strong>{numFiles}</strong> ファイル
          </p>
        </>
      )}
      <NavigationBreadcrumb path={path} attached="bottom" />
    </Segment>
  );
};
