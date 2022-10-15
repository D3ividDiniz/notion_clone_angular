import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  protected getApi(path:string, param?:string){
    if(param)
      return environment.apiURL + path + '/' + param;

    return environment.apiURL + path;
  }
}
