import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { ThumbnailService } from 'src/app/services/thumbnail.service';
import { AgentService } from 'src/app/services/agent.service';
import { UserPrefService } from 'src/app/services/user-pref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  @Input() video: FileData;
  prettyName: string;
  prettySize: string;
  prettyDate: string;
  loadingThumbnail: boolean;
  currentThumbnail: string;

  private thumbnailList: string[];
  private thumbIndex: number;
  private noThumbStyle: string;

  constructor(private thumbnailService: ThumbnailService,
    private userPrefsService: UserPrefService,
    private agentService: AgentService,
    private router: Router) { }

  ngOnInit() {
    this.thumbIndex = -1;
    this.loadingThumbnail = true;

    this.prettyName = this.getPrettyName(this.video.name);
    this.prettySize = this.formatBytes(this.video.size, undefined);
    this.prettyDate = this.video.birthTime.substring(0, 10);

    this.setNoThumbStyle();
    this.getThumbnails();
  }

  private getThumbnails() {
    this.thumbnailService.getThumbnailList(this.video.id)
      .subscribe((data: string[]) => {
        // set data if it's not empty
        if (data.length > 0) {
          this.thumbnailList = data;

          // if init the thumbnail on the page, only on the first time
          if (this.loadingThumbnail) {
            this.nextThumbnail();
            this.loadingThumbnail = false;
          }
        }
      });
  }

  private nextThumbnail() {
    const curThumbIndex = ++this.thumbIndex % this.thumbnailList.length;
    this.currentThumbnail = this.thumbnailService.getThumbnailUrl(this.video.id, this.thumbnailList[curThumbIndex]);
  }

  private setNoThumbStyle() {
    if (!this.noThumbStyle) {
      this.noThumbStyle = `no-thumb-deg-${Math.floor(Math.random()*18)}`;
    }
  }

  private getPrettyName(name) {
    return name.replace(/_/g, ' ').replace(/(\[[a-zA-Z0-9\- ~,\.\-&]+\]|\([a-zA-Z0-9\- ~,\.]+\))/g, '').replace(/(\.[avimk4]+$)/g, '').trim();
  }

  private formatBytes(a,b) {
    if(0===a)return"0 Bytes";
    const c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
  }

  playFile() {
    // TODO: convert this to pipe
    this.agentService.triggerPlay(this.video.rel)
      .subscribe((playOK) => {
        if (playOK) {
          this.userPrefsService.notifyPlay(this.video.id).subscribe();
        }
      });
  }

  jumpToFolder() {
    // TODO: find better way to do this later
    const parentFolder = this.video.rel.substring(1, this.video.rel.length - this.video.name.length);
    this.router.navigateByUrl(`/v/browse/${parentFolder}`);
  }
}
