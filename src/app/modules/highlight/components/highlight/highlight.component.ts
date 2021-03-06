import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import VIDEO_LISTS from 'src/app/modules/shared/models/VideoLists.enum';
import { RecentlyChangedData } from 'src/app/modules/shared/models/GenericData';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  recentlyUpdatedSeries$: Observable<DirectoryKind[]>;
  favouriteSeries$: Observable<DirectoryKind[]>;

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.recentlyUpdatedSeries$ = this.fileListService.getRecent().pipe(
      map((changed: RecentlyChangedData) => changed.changed));

    this.favouriteSeries$ = this.fileListService.getList(VIDEO_LISTS.FAV);
  }
}
