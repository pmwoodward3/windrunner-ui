import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FileData } from '../models/FileData';

// const dummy = (FileData[])[{"name":"0001-last-6-commits.patch","path":"/mnt/c/Users/dt224292/Downloads/0001-last-6-commits.patch","rel":"0001-last-6-commits.patch","type":"FILE","size":26811,"birthTime":"2019-01-28T15:25:35.519Z","metadata":{}},{"name":"BSL Boot.pdf","path":"/mnt/c/Users/dt224292/Downloads/BSL Boot.pdf","rel":"BSL Boot.pdf","type":"FILE","size":1997732,"birthTime":"2019-05-16T16:08:13.751Z","metadata":{}},{"name":"BSL Overview.pdf","path":"/mnt/c/Users/dt224292/Downloads/BSL Overview.pdf","rel":"BSL Overview.pdf","type":"FILE","size":4163110,"birthTime":"2019-05-28T18:21:15.907Z","metadata":{}}];

@Injectable({
  providedIn: 'root'
})
export class FileListService {

  constructor() { }

  getDirectoryList(directory: string): Observable<FileData[]> {
    return of(null);
  }

  getRecent(): Observable<FileData[]> {
    return of(null);
  }
}
