import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'def';

@Injectable({
  providedIn: 'root'
})
export class GovtdataService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
    
     public storeOnLocalStorageGov(govid: string): void {
          

          // get array of tasks from local storag
          // insert updated array to local storage
          this.storage.set(STORAGE_KEY, govid);
          console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
     }

     public getFromLocalStorageGov(): string {
        
      return this.storage.get(STORAGE_KEY);
    }

}