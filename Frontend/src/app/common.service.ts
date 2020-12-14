import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  constructor(private http:HttpClient) {}
}
