import { NotebookInterface, responseNotebookInterface } from "./notebook";

export interface resPostInterface{
  status:boolean;
  message:string;
  notebook:responseNotebookInterface
}
