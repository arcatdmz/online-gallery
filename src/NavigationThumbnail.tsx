import { FC, useContext } from "react";

import styles from "./NavigationThumbnail.module.css";

import { BasePathContext } from "./BasePathContext";

interface NavigationThumbnailProps {
  name: string;
  thumbnail: string;
  link: string;
}

export const NavigationThumbnail: FC<NavigationThumbnailProps> = ({
  name,
  thumbnail,
  link
}) => {
  const { storagePath } = useContext(BasePathContext);

  return (
    <a href={`${storagePath}${link}`} className={styles.thumbnail}>
      <img
        src={`${storagePath}${thumbnail}`}
        width="200"
        height="133.25"
        alt={name}
        loading="lazy"
      />
      <span className={styles.caption}>{name}</span>
    </a>
  );
};
