import { Injectable, Type } from '@angular/core';
import { MainService } from './base/main.service';
import { HttpClient } from '@angular/common/http';
import { NotebookInterface, responseNotebookInterface } from '../models/notebook';
import { Observable } from 'rxjs';
import { resPostInterface } from '../models/res.post';


@Injectable({
  providedIn: 'root'
})
export class NotesService extends MainService {

  constructor(private http:HttpClient) {
    super();
  }

  canUpdate: boolean = true;

  actualNotas: string[] = [];
  id: string = '';
  content: string = '';
  title:string = this.actualNotas[0];


  transformDataBook(notes:NodeList, id:string){
    this.actualNotas = [];
    notes.forEach((node,index)=>{
      if(index == 0){
        this.actualNotas.push(String(node.textContent))
      }else{
        // if (node.textContent == ""){
        //   this.actualNotas.push("<div><br></div>")
        // }
        // console.log(node.childNodes)
        let img = false
        node.childNodes.forEach(c=>{
          if(String(c) == String('[object HTMLImageElement]')){
            console.log()
            this.actualNotas.push(`<div><img style="object-fit:cover; max-height: 300px" src=${c['src']}></div>`)
            img = true
            
          }
        })
        if (!img) this.actualNotas.push("<div>"+String(node.textContent)+"</div>")
      }
    })
    this.id = id;
    this.content = JSON.stringify(this.actualNotas.slice(1));
    this.title = this.actualNotas[0];
  }

  createNote(note:NotebookInterface):Observable<resPostInterface>{
    return this.http.post<resPostInterface>(this.getApi('notes'),note);
  }

  getAllNotes():Observable<responseNotebookInterface[]>{
    return this.http.get<responseNotebookInterface[]>(this.getApi('notes'))
  }

  getOneNotes(id:(number | string)):Observable<responseNotebookInterface>{
    return this.http.get<responseNotebookInterface>(this.getApi('notes',String(id)))
  }

  updateNote():void{
    console.log(1)
    if(this.id && this.title && this.content){
      console.log(2)
    this.http.patch<void>(this.getApi("notes",String(this.id)), {title:this.title, content:this.content}).subscribe(res=>{});
  }
  }
  deleteOneNote(id:(string | number)):any{
    this.http.delete<void>(this.getApi("notes", String(id))).subscribe(()=>{
      return true;
    }, ()=>{
      return false
    })
  }


}
