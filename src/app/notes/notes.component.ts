import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { timer,Unsubscribable } from 'rxjs';
import { responseNotebookInterface } from '../models/notebook';
import { resPostInterface } from '../models/res.post';
import { MainService } from '../services/base/main.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebook: responseNotebookInterface;
  idParam: string;
  timer$ = timer(4000,1000);

  constructor(private notesService: NotesService, private router: Router) {
    this.idParam = window.location.pathname.substring(1)
   }

  ngOnInit(): void {
    this.notesService.updateNote();
    if(this.idParam != undefined && this.idParam != '' && this.idParam){
      this.getBookData(this.idParam);
      this.autoSave();
    }
  }
  ngOnDetroy(): void{
    this.notesService.updateNote();
    this.timer$ = timer(0,0);
  }

  autoSave(){
    this.timer$.subscribe(()=>{
      this.notesService.updateNote();
    })
  }

  getBookData(id:(number | string)){
    const lineBook = document.getElementById('line');
    this.notesService.getOneNotes(id).subscribe((dataBook:responseNotebookInterface)=>{
      this.notebook = dataBook;
      lineBook.innerHTML += dataBook.title;
      const bookContent:string[] = JSON.parse(this.notebook.content);
      bookContent.forEach(line=>{
        lineBook.innerHTML += line;
      })
      const lines:NodeList = document.getElementById('line')?.childNodes;
      this.notesService.transformDataBook(lines, this.idParam);
    });


  };
  onKeyPress(x:KeyboardEvent){
    const lines:NodeList = document.getElementById('line')?.childNodes;
    this.notesService.transformDataBook(lines, this.idParam);

    if(x.key == "Enter" && !this.idParam){
      this.notesService.createNote({title:lines[0].textContent, content:""}).subscribe((res:resPostInterface)=>{
        if(res.status){
          this.router.navigate([res.notebook._id])
        }else{
          alert("Tivemos um erro")
        }
      });



  }
}
}
