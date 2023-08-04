import { FC, Fragment } from "react";
import { Breadcrumb } from "semantic-ui-react";

import styles from "./NavigationBreadcrumb.module.css";

import { NavigationBreadcrumbSection } from "./NavigationBreadcrumbSection";

interface NavigationBreadcrumbProps {
  path: string;
  attached?: "top" | "bottom" | "fixed";
}

export const NavigationBreadcrumb: FC<NavigationBreadcrumbProps> = ({
  path,
  attached
}) => {
  const paths = path ? path.split("/") : null;
  return (
    <div
      className={`${styles.breadcrumb} ${
        attached === "bottom"
          ? styles.bottom
          : attached === "fixed"
          ? styles.fixed
          : styles.top
      }`}
    >
      <Breadcrumb>
        {paths ? (
          paths.map((_, i) => (
            <Fragment key={i}>
              <NavigationBreadcrumbSection paths={paths} index={i} />
              <Breadcrumb.Divider />
            </Fragment>
          ))
        ) : (
          <Breadcrumb.Section>-</Breadcrumb.Section>
        )}
      </Breadcrumb>
    </div>
  );
};
