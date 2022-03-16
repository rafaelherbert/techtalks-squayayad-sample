export interface ILibraryService<T> {
      addFile(name: string, file: any, shouldOverWrite?: boolean): void;
}
