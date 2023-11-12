import { KeyValue } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { responseNotebookInterface } from '../models/notebook';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opennedMenu = true;

  cadernos: responseNotebookInterface[];

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllNotes()
  }
  
  getAllNotes(){
    this.notesService.getAllNotes().subscribe((dataBooks:responseNotebookInterface[])=>{
      this.cadernos = dataBooks
    })
  }
  deleteNote(id:string){
    if(!window.confirm("Deseja mesmo remover esse caderno? :/")){
      return
    }
    this.notesService.deleteOneNote(id)
    this.router.navigate(['']);
  }
  showMenu(){
    this.opennedMenu = !this.opennedMenu;
    if(!this.opennedMenu){
      document.getElementById("inputNav").style.left = "0%";
      document.getElementById("notebook").style.cssText = "width: 75%; position:fixed; left: 25%"
      return
    }
    document.getElementById("inputNav").style.left = "";
    document.getElementById("inputNav").style.position = "absolute";
    document.getElementById("notebook").style.cssText = ""
  }
}
