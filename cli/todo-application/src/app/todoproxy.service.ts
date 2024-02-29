import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoproxyService {

  //hostUrl:string = 'https://todoappsu2024.azurewebsites.net/';
  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getListsIndex() {
    return this.httpClient.get<any[]>( this.hostUrl + 'app/list');
  }

  getItems(index: string) {
    return this.httpClient.get( this.hostUrl + 'app/list/' + index + '/tasks');
  }
}
