import { FC, MouseEvent, useCallback, useContext } from "react";

import styles from "./ImageViewer.module.css";

import { BasePathContext } from "./BasePathContext";
import { NavigationBreadcrumb } from "./NavigationBreadcrumb";
import { NavigatorContext } from "./NavigatorContext";
import { fromPathToImgLink } from "./logic";

interface NavigationSegmentProps {
  path: string;
  dirPath: string;
}

export const ImageViewer: FC<NavigationSegmentProps> = ({ path, dirPath }) => {
  const { setPath } = useContext(NavigatorContext);
  const { storagePath } = useContext(BasePathContext);

  const active = path === dirPath;
  const imgLink = `${storagePath}${fromPathToImgLink(path)}`;

  const handleBackdropClick = useCallback(() => {
    setPath && setPath(dirPath);
  }, [dirPath, setPath]);

  const handleClick = useCallback((ev: MouseEvent) => {
    ev.stopPropagation();
    return true;
  }, []);

  return (
    <div
      className={`${styles.viewer}${active ? "" : ` ${styles.active}`}`}
      onClick={handleBackdropClick}
    >
      {active ? null : (
        <div className={styles.content}>
          <a href={imgLink} target="_blank" onClick={handleClick}>
            <img src={imgLink} />
          </a>
        </div>
      )}
      <NavigationBreadcrumb
        path={dirPath}
        attached="fixed"
        onClick={handleClick}
      />
    </div>
  );
};
