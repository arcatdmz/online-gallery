import { FC, Fragment, useContext } from "react";
import { Breadcrumb, Icon } from "semantic-ui-react";

import styles from "./NavigationBreadcrumb.module.css";

import { BasePathContext } from "./BasePathContext";

interface NavigationBreadcrumbProps {
  path: string;
  attached?: "top" | "bottom" | "fixed";
}

export const NavigationBreadcrumb: FC<NavigationBreadcrumbProps> = ({
  path,
  attached
}) => {
  const { appPath } = useContext(BasePathContext);
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
          paths.map((key, i) => (
            <Fragment key={i}>
              <Breadcrumb.Section
                as="a"
                href={`${appPath}?path=${encodeURIComponent(
                  paths.slice(0, i + 1).join("/")
                )}`}
                key={i}
              >
                {i === 0 ? <Icon name="home" /> : key}
              </Breadcrumb.Section>
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
