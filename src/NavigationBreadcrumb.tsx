import { FC, Fragment, HTMLAttributes } from "react";
import { Breadcrumb } from "semantic-ui-react";

import styles from "./NavigationBreadcrumb.module.css";

import { NavigationBreadcrumbSection } from "./NavigationBreadcrumbSection";

interface NavigationBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  path: string;
  attached?: "top" | "bottom" | "fixed";
}

export const NavigationBreadcrumb: FC<NavigationBreadcrumbProps> = ({
  path,
  attached,
  ...props
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
      {...props}
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
