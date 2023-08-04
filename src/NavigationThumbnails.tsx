import { FC } from "react";

import styles from "./NavigationThumbnails.module.css";

import { NavigationThumbnail } from "./NavigationThumbnail";
import { fromDataToThumbnailEntries } from "./logic";

interface NavigationThumbnailsProps {
  data: { path: string; directory?: boolean }[];
  path: string;
  lastFilePath?: string;
}

export const NavigationThumbnails: FC<NavigationThumbnailsProps> = ({
  data,
  path,
  lastFilePath
}) => {
  const filtered = fromDataToThumbnailEntries(data, path, lastFilePath);

  return (
    <div className={styles.thumbnails}>
      {filtered.map((e, i) => (
        <NavigationThumbnail key={e?.name || i} path={path} {...e} />
      ))}
    </div>
  );
};
