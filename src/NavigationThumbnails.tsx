import { FC, useMemo } from "react";

import styles from "./NavigationThumbnails.module.css";

import { NavigationThumbnail } from "./NavigationThumbnail";

const thumbnailPattern = new RegExp(/^(.+)_800x800\.([a-zA-Z]+)$/);

interface NavigationThumbnailsProps {
  path: string;
  data: { path: string; directory?: boolean }[];
}

export const NavigationThumbnails: FC<NavigationThumbnailsProps> = ({
  path: parent,
  data
}) => {
  const filtered = useMemo(
    () =>
      data
        .filter(({ path }) => thumbnailPattern.test(path))
        .map(({ path }) => {
          const relPath = path.substring(parent.length + 1);
          const result = thumbnailPattern.exec(path) as RegExpExecArray;
          return {
            name: relPath.replace("_800x800", ""),
            thumbnail: path,
            link: `${result[1]}_2400x2400.${result[2]}`
          };
        }),
    [parent, data]
  );

  return (
    <div className={styles.thumbnails}>
      {filtered.map((e, i) => (
        <NavigationThumbnail key={e?.name || i} {...e} />
      ))}
    </div>
  );
};
