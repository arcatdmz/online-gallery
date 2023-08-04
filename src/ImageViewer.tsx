import { FC, MouseEvent, useCallback, useContext, useState } from "react";
import { Button } from "semantic-ui-react";

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
  const [inverted, setInverted] = useState(false);

  const inactive = path === dirPath;
  const imgLink = `${storagePath}${fromPathToImgLink(path)}`;

  const handleBackdropClick = useCallback(() => {
    setPath && setPath(dirPath);
  }, [dirPath, setPath]);

  const handleClick = useCallback((ev: MouseEvent) => {
    ev.stopPropagation();
    return true;
  }, []);

  const handleInvertClick = useCallback(
    (ev: MouseEvent) => {
      ev.stopPropagation();
      setInverted(!inverted);
    },
    [inverted]
  );

  return (
    <div
      className={`${styles.viewer}${inactive ? "" : ` ${styles.active}`}`}
      onClick={handleBackdropClick}
    >
      {!inactive && (
        <div className={styles.tools}>
          <Button
            basic
            icon="shuffle"
            content="180度回転"
            inverted
            onClick={handleInvertClick}
          />
        </div>
      )}
      {inactive ? null : (
        <div className={styles.content}>
          <a href={imgLink} target="_blank" onClick={handleClick}>
            <img src={imgLink} className={inverted ? styles.inverted : ""} />
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
