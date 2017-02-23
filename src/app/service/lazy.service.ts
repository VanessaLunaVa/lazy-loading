import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class LazyService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }


     enviarArchivo(cedula, archivo) {
         return this.http.post("/procesarArchivo/" + cedula, JSON.stringify({file: archivo}), this.options);
     }

}