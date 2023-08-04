import { useQuery } from "@tanstack/react-query";
import { FC, useContext, useEffect, useState } from "react";
import { Icon, List, ListItemProps } from "semantic-ui-react";
import { BasePathContext } from "./BasePathContext";

interface DirectoryListItemProps extends ListItemProps {
  dirPath: string;
  onLoad(paths: string[]): void;
}

export const DirectoryListItem: FC<DirectoryListItemProps> = ({
  dirPath,
  onLoad,
  ...props
}) => {
  const { storagePath } = useContext(BasePathContext);
  const { error, data } = useQuery({
    queryKey: dirPath.split("/"),
    queryFn: () =>
      fetch(`${storagePath}${dirPath}/index.json`).then(
        res => res.json() as Promise<{ path: string; directory?: boolean }[]>
      )
  });
  const [list, setList] =
    useState<({ path: string; directory?: boolean } | string | string[])[]>(
      null
    );
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }
    setComplete(false);
    setList(data.map(e => (e.directory ? e : e.path)));
  }, [data]);

  useEffect(() => {
    setComplete(
      list.reduce(
        (p, c) => p && (typeof c === "string" || Array.isArray(c)),
        true
      )
    );
  }, [list]);

  return (
    <>
      <List.Item {...props}>
        {dirPath}{" "}
        {error ? (
          <Icon name="warning sign" />
        ) : data ? (
          <Icon name={complete ? "check circle" : "check circle outline"} />
        ) : null}
      </List.Item>
    </>
  );
};
