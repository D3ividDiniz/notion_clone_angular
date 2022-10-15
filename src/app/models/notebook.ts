export interface NotebookInterface {
  title: string,
  content: string
}

export interface responseNotebookInterface extends NotebookInterface {
  _id: string,
}
