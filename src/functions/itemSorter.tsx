export const itemSorter = {
  "date-modified-newest": {
    label: "Modified (Newest)",
    func: (a, b) =>
      new Date(b.value.metaData.date.modified).getTime() -
      new Date(a.value.metaData.date.modified).getTime(),
  },
  "date-modified-oldest": {
    label: "Modified (Oldest)",
    func: (a, b) =>
      new Date(a.value.metaData.date.modified).getTime() -
      new Date(b.value.metaData.date.modified).getTime(),
  },
  "date-created-newest": {
    label: "Created (Newest)",
    func: (a, b) =>
      new Date(b.value.metaData.date.created).getTime() -
      new Date(a.value.metaData.date.created).getTime(),
  },
  "date-created-oldest": {
    label: "Created (Oldest)",
    func: (a, b) =>
      new Date(a.value.metaData.date.created).getTime() -
      new Date(b.value.metaData.date.created).getTime(),
  },
  "title-asc": {
    label: "A-Z",
    func: (a, b) => a.value.data.title.localeCompare(b.value.data.title),
  },
  "title-desc": {
    label: "Z-A",
    func: (a, b) => b.value.data.title.localeCompare(a.value.data.title),
  },
};
