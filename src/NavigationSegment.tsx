import { useQuery } from "@tanstack/react-query";
import { FC, useContext, useMemo } from "react";
import { Loader, Portal, Segment } from "semantic-ui-react";

import styles from "./NavigationSegment.module.css";

import { BasePathContext } from "./BasePathContext";
import { NavigationBreadcrumb } from "./NavigationBreadcrumb";
import { NavigationList } from "./NavigationList";
import { NavigationThumbnails } from "./NavigationThumbnails";
import { fromDataToThumbnailEntries, getPath } from "./logic";
import { ImageViewer } from "./ImageViewer";

interface NavigationSegmentProps {
  path: string;
  lastFilePath?: string;
}

export const NavigationSegment: FC<NavigationSegmentProps> = ({
  path,
  lastFilePath
}) => {
  const { storagePath } = useContext(BasePathContext);
  const dirPath = getPath(path);

  const { isLoading, error, data } = useQuery({
    queryKey: dirPath.split("/"),
    queryFn: () =>
      fetch(`${storagePath}${dirPath}/index.json`).then(
        res => res.json() as Promise<{ path: string; directory?: boolean }[]>
      )
  });

  const thumbnails = useMemo(
    () => (data ? fromDataToThumbnailEntries(data, dirPath, lastFilePath) : []),
    [data, dirPath, lastFilePath]
  );

  const numFolders = useMemo(
    () => data?.filter(e => !!e.directory).length || 0,
    [data]
  );
  const numFiles = (data?.length || 0) - numFolders;

  return (
    <Segment>
      <Portal open>
        <ImageViewer dirPath={dirPath} path={path} thumbnails={thumbnails} />
      </Portal>
      <NavigationBreadcrumb path={dirPath} />
      {isLoading ? (
        <div className={styles.loading}>
          <Loader active />
        </div>
      ) : error || !data ? (
        <div className={styles.error}>データが取得できませんでした。</div>
      ) : (
        <>
          {numFolders <= 0 ? (
            <NavigationThumbnails dirPath={dirPath} thumbnails={thumbnails} />
          ) : (
            <NavigationList path={dirPath} data={data} />
          )}
          <p className={styles.meta}>
            全 <strong>{numFolders}</strong> フォルダ,{" "}
            <strong>{numFiles}</strong> ファイル
          </p>
        </>
      )}
      <NavigationBreadcrumb path={dirPath} attached="bottom" />
    </Segment>
  );
};
