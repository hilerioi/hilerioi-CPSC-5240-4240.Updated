import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { TodoproxyService } from '../todoproxy.service';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router} from '@angular/router';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrl: './todolists.component.css'
})
export class TodolistsComponent {

  displayedColumns: string[] = ['name', 'description', 'due', 'state', 'owner'];
  dataSource = new MatTableDataSource<any>();

//  listsObservable: Observable<any[]>;

  constructor(private router: Router, proxy$: TodoproxyService) {
//    this.listsObservable = proxy$.getListsIndex();

    proxy$.getListsIndex().subscribe( (result: any[]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
      //this.dataSource.sort = this.sort;
      console.log("retrieved data from server.");
    });
  }

  ngOnInit() {
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }
}
