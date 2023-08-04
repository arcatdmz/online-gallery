const filePattern = new RegExp(/^(.+)\/([^/]+)\.([a-zA-Z]+)$/i);
const thumbnailPattern = new RegExp(/^(.+)_800x800\.([a-zA-Z]+)$/);

interface ThumbnailEntryIface {
  name: string;
  thumbnail: string;
  link: string;
  active?: boolean;
}

export function isFile(path: string) {
  return filePattern.test(path);
}

export function getPath(path: string) {
  if (!isFile(path)) {
    return path;
  }
  const result = filePattern.exec(path);
  return result ? result[1] : path;
}

export function fromDataToThumbnailEntries(
  data: { path: string }[],
  parent: string,
  lastFilePath?: string
): ThumbnailEntryIface[] {
  return data
    .filter(({ path }) => thumbnailPattern.test(path))
    .map(({ path }) => {
      const fileName = path.substring(parent.length + 1);
      const result = thumbnailPattern.exec(path) as RegExpExecArray;
      const [, baseName, ext] = result;
      const name = fileName.replace("_800x800", "");
      return {
        name,
        thumbnail: path,
        link: `${baseName}_2400x2400.${ext}`,
        active: `${parent}/${name}` === lastFilePath
      };
    });
}

export function fromThumbnailEntryToImgProps(
  storagePath: string | null,
  entry: ThumbnailEntryIface
) {
  return {
    src: `${storagePath || ""}${entry.thumbnail}`,
    width: 200,
    height: 133.25,
    alt: entry.name
  };
}

export function fromPathToImgLink(path: string) {
  const result = filePattern.exec(path);
  if (!result) {
    return;
  }
  const [, dirPath, name, ext] = result;
  return `${dirPath}/${name}_2400x2400.${ext}`;
}
