import { FC } from "react";

import styles from "./NavigationThumbnails.module.css";

import { NavigationThumbnail } from "./NavigationThumbnail";
import { ThumbnailEntryIface } from "./logic";

interface NavigationThumbnailsProps {
  dirPath: string;
  thumbnails: ThumbnailEntryIface[];
}

export const NavigationThumbnails: FC<NavigationThumbnailsProps> = ({
  dirPath,
  thumbnails
}) => (
  <div className={styles.thumbnails}>
    {thumbnails.map((e, i) => (
      <NavigationThumbnail key={e?.name || i} dirPath={dirPath} {...e} />
    ))}
  </div>
);
