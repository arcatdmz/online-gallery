import { FC, useMemo } from "react";

import styles from "./NavigationThumbnails.module.css";

import { NavigationThumbnail } from "./NavigationThumbnail";
import { fromDataToThumbnailEntries } from "./logic";

interface NavigationThumbnailsProps {
  path: string;
  data: { path: string; directory?: boolean }[];
}

export const NavigationThumbnails: FC<NavigationThumbnailsProps> = ({
  path,
  data
}) => {
  const filtered = useMemo(
    () => fromDataToThumbnailEntries(path, data),
    [path, data]
  );

  return (
    <div className={styles.thumbnails}>
      {filtered.map((e, i) => (
        <NavigationThumbnail key={e?.name || i} path={path} {...e} />
      ))}
    </div>
  );
};
