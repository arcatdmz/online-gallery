import { FC, MouseEvent, useCallback, useContext, useMemo } from "react";
import { Breadcrumb, Icon } from "semantic-ui-react";

import { BasePathContext } from "./BasePathContext";
import { NavigatorContext } from "./NavigatorContext";

interface NavigationBreadcrumbSectionProps {
  paths: string[];
  index: number;
}

export const NavigationBreadcrumbSection: FC<
  NavigationBreadcrumbSectionProps
> = ({ paths, index }) => {
  const { appPath } = useContext(BasePathContext);
  const { setPath } = useContext(NavigatorContext);

  const targetPath = useMemo(
    () => paths.slice(0, index + 1).join("/"),
    [paths, index]
  );

  const handleClick = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault();
      setPath && setPath(targetPath);
      return false;
    },
    [setPath, targetPath]
  );

  return (
    <Breadcrumb.Section
      as="a"
      href={`${appPath}?path=${encodeURIComponent(targetPath)}`}
      onClick={handleClick}
    >
      {index === 0 ? <Icon name="home" /> : paths[index]}
    </Breadcrumb.Section>
  );
};
