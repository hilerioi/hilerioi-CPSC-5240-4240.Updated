import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
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
    private list$: TodoproxyService
  ) { 
    this.listId = route.snapshot.params['id'];
    this.list$.getItems(this.listId).subscribe((res: any) => {
      this.name = res.name;
      this.listItems = res;
    });
  }

  ngOnInit():void {}
}
