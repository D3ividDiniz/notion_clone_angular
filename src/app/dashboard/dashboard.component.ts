import { KeyValue } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { responseNotebookInterface } from '../models/notebook';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cadernos: responseNotebookInterface[];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getAllNotes()
  }
  getAllNotes(){
    this.notesService.getAllNotes().subscribe((dataBooks:responseNotebookInterface[])=>{
      this.cadernos = dataBooks
    })
  }
  deleteNote(id:string){
    this.notesService.deleteOneNote(id)
  }


}
