import { FC, MouseEvent, useCallback, useContext } from "react";

import styles from "./NavigationThumbnail.module.css";

import { BasePathContext } from "./BasePathContext";
import { NavigatorContext } from "./NavigatorContext";
import { fromThumbnailEntryToImgProps } from "./logic";

interface NavigationThumbnailProps {
  path: string;
  name: string;
  thumbnail: string;
  link: string;
  active?: boolean;
}

export const NavigationThumbnail: FC<NavigationThumbnailProps> = props => {
  const { path, name, link, active } = props;

  const { storagePath } = useContext(BasePathContext);
  const { setPath } = useContext(NavigatorContext);
  const handleClick = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault();
      setPath && setPath(`${path}/${name}`);
      return false;
    },
    [path, name, setPath]
  );

  return (
    <a
      href={`${storagePath}${link}`}
      className={`${styles.thumbnail}${active ? ` ${styles.active}` : ""}`}
      onClick={handleClick}
    >
      <img
        {...fromThumbnailEntryToImgProps(storagePath, props)}
        loading="lazy"
      />
      <span className={styles.caption}>{name}</span>
    </a>
  );
};
