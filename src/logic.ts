const filePattern = new RegExp(/^(.+)\/([^/]+)\.([a-zA-Z]+)$/i);
const thumbnailPattern = new RegExp(/^(.+)_800x800\.([a-zA-Z]+)$/);

interface ThumbnailEntryIface {
  name: string;
  thumbnail: string;
  link: string;
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
  parent: string,
  data: { path: string; directory?: boolean }[]
): ThumbnailEntryIface[] {
  return data
    .filter(({ path }) => thumbnailPattern.test(path))
    .map(({ path }) => {
      const relPath = path.substring(parent.length + 1);
      const result = thumbnailPattern.exec(path) as RegExpExecArray;
      const [, baseName, ext] = result;
      return {
        name: relPath.replace("_800x800", ""),
        thumbnail: path,
        link: `${baseName}_2400x2400.${ext}`
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
