import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { TodoproxyService } from '../todoproxy.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todotasks',
  templateUrl: './todotasks.component.html',
  styleUrl: './todotasks.component.css'
})
export class TodotasksComponent {
  name: string = "";
  listId: string;
  listItems: any;

  constructor(
    private route: ActivatedRoute,
    private list$: TodoproxyService,
    private location: LocationStrategy
  ) { 
    this.listId = route.snapshot.params['id'];
    const state = location.getState() as {name:string};
    if (state != null) {
      this.name = state.name;
    } else {
      this.name = "";
    }
    this.list$.getItems(this.listId).subscribe((res: any) => {
      this.listItems = res;
    });
  }

  ngOnInit():void {}

}
