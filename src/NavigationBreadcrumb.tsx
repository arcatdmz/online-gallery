import { FC, Fragment, HTMLAttributes } from "react";
import { Breadcrumb } from "semantic-ui-react";

import styles from "./NavigationBreadcrumb.module.css";

import { NavigationBreadcrumbSection } from "./NavigationBreadcrumbSection";

interface NavigationBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  path?: string;
  dirPath: string;
  attached?: "top" | "bottom" | "fixed";
}

export const NavigationBreadcrumb: FC<NavigationBreadcrumbProps> = ({
  path,
  dirPath,
  attached,
  ...props
}) => {
  const fileName = path && path.substring(dirPath.length + 1);
  const paths = dirPath ? dirPath.split("/") : null;
  return (
    <div
      className={`${styles.breadcrumb} ${
        attached === "bottom"
          ? styles.bottom
          : attached === "fixed"
          ? styles.fixed
          : styles.top
      }`}
      {...props}
    >
      <Breadcrumb>
        {paths &&
          paths.map((_, i) => (
            <Fragment key={i}>
              <NavigationBreadcrumbSection paths={paths} index={i} />
              <Breadcrumb.Divider />
            </Fragment>
          ))}
        {fileName && <Breadcrumb.Section>{fileName}</Breadcrumb.Section>}
      </Breadcrumb>
    </div>
  );
};
