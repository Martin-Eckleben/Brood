import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isDevMode: boolean = isDevMode()

  constructor() { }
}
