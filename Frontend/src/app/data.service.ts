import { Inject,Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'abc';

@Injectable({
  providedIn: 'root'
})
export class DataService {


     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
    
     public storeOnLocalStorage(gasid: string): void {
          

          // get array of tasks from local storag
          // insert updated array to local storage
          this.storage.set(STORAGE_KEY, gasid);
          console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
     }

     public getFromLocalStorage(): string {
        
      return this.storage.get(STORAGE_KEY);
    }

}
