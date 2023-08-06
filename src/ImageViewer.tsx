import {
  FC,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Button } from "semantic-ui-react";

import styles from "./ImageViewer.module.css";

import { BasePathContext } from "./BasePathContext";
import { NavigationBreadcrumb } from "./NavigationBreadcrumb";
import { NavigatorContext } from "./NavigatorContext";
import { ThumbnailEntryIface, fromPathToImgLink } from "./logic";

interface NavigationSegmentProps {
  path: string;
  dirPath: string;
  thumbnails: ThumbnailEntryIface[];
}

export const ImageViewer: FC<NavigationSegmentProps> = ({
  path,
  dirPath,
  thumbnails
}) => {
  const { setPath } = useContext(NavigatorContext);
  const { storagePath } = useContext(BasePathContext);
  const [rotation, setRotation] = useState(0);

  const isDirectory = path === dirPath;
  const imgLink = `${storagePath}${fromPathToImgLink(path)}`;

  const [prevFile, nextFile] = useMemo(() => {
    if (isDirectory || !thumbnails) {
      return [null, null];
    }
    const index = thumbnails.findIndex(e => e.active);
    if (index < 0) {
      return [null, null];
    }
    return [
      index > 0 ? thumbnails[index - 1] : null,
      index < thumbnails.length - 1 ? thumbnails[index + 1] : null
    ];
  }, [isDirectory, thumbnails]);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (isDirectory) {
        return;
      }
      if (ev.type === "keydown") {
        ev.preventDefault();
        return;
      }
      const key = ev.key.toLowerCase();
      switch (key) {
        case "arrowup":
          setRotation((rotation + 270) % 360);
          break;
        case "arrowdown":
          setRotation((rotation + 90) % 360);
          break;
        case "arrowleft":
          setPath && prevFile && setPath(`${dirPath}/${prevFile.name}`);
          break;
        case "arrowright":
          setPath && nextFile && setPath(`${dirPath}/${nextFile.name}`);
          break;
        case "escape":
          setPath && setPath(dirPath);
          break;
      }
    };
    window.addEventListener("keyup", listener);
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keyup", listener);
      window.removeEventListener("keydown", listener);
    };
  }, [
    isDirectory,
    setPath,
    rotation,
    setRotation,
    prevFile,
    nextFile,
    dirPath
  ]);

  const handleBackdropClick = useCallback(() => {
    setPath && setPath(dirPath);
  }, [dirPath, setPath]);

  const handleClick = useCallback((ev: MouseEvent) => {
    ev.stopPropagation();
    return true;
  }, []);

  const handleRotationClick = useCallback(
    (ev: MouseEvent) => {
      ev.stopPropagation();
      setRotation((rotation + 90) % 360);
    },
    [rotation]
  );

  const handlePrevFileClick = useCallback(
    (ev: MouseEvent) => {
      ev.stopPropagation();
      setPath && prevFile && setPath(`${dirPath}/${prevFile.name}`);
    },
    [setPath, dirPath, prevFile]
  );

  const handleNextFileClick = useCallback(
    (ev: MouseEvent) => {
      ev.stopPropagation();
      setPath && nextFile && setPath(`${dirPath}/${nextFile.name}`);
    },
    [setPath, dirPath, nextFile]
  );

  return (
    <div
      className={`${styles.viewer}${isDirectory ? "" : ` ${styles.active}`}`}
      onClick={handleBackdropClick}
    >
      {!isDirectory && (
        <div className={styles.tools}>
          <Button
            basic
            icon="shuffle"
            content={`回転: ${rotation}度`}
            inverted
            onClick={handleRotationClick}
          />
          <Button
            basic
            inverted
            circular
            icon="arrow left"
            disabled={!prevFile}
            onClick={handlePrevFileClick}
          />
          <Button
            basic
            inverted
            circular
            icon="arrow right"
            disabled={!nextFile}
            onClick={handleNextFileClick}
          />
        </div>
      )}
      {isDirectory ? null : (
        <div className={styles.content}>
          <a href={imgLink} target="_blank" onClick={handleClick}>
            <img src={imgLink} className={styles[`rot${rotation}`]} />
          </a>
        </div>
      )}
      <NavigationBreadcrumb
        path={path}
        dirPath={dirPath}
        attached="fixed"
        onClick={handleClick}
      />
    </div>
  );
};
