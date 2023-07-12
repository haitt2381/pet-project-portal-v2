import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResponseInfo} from "../../model/common/response-info.model";
import {Router} from "@angular/router";
import {QueryParams} from "../../model/common/query-params.model";

@Component({
  selector: 'app-pagination',
  template: `
    <div class="join">
      <button class="join-item btn" [ngClass]="responseInfo?.page - 1 <= -1 ? 'btn-disabled' : ''" (click)="previousPage()">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <button class="join-item btn">{{responseInfo?.page + 1}}</button>
      <button class="join-item btn"  [ngClass]="responseInfo?.page + 1 >= Math.ceil(this.responseInfo?.total / this.responseInfo?.size) ? 'btn-disabled' : ''" (click)="nextPage()">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  `,
})
export class PaginationComponent {
  @Input() responseInfo: ResponseInfo;
  @Output() event = new EventEmitter();
  protected readonly Math = Math;


  constructor(private router: Router) {

  }

  nextPage() {
    let queryParams = new QueryParams();
    queryParams.page_index = this.responseInfo.page + 1;
    queryParams.page_size = this.responseInfo.size;
    this.router.navigate([], {queryParamsHandling: 'merge', queryParams: queryParams}).then(() => {
      this.event.emit();
    })
  }

  previousPage() {
    let queryParams = new QueryParams();
    queryParams.page_index = this.responseInfo.page - 1;
    queryParams.page_size = this.responseInfo.size;
    this.router.navigate([], {queryParamsHandling: 'merge', queryParams: queryParams}).then(() => {
      this.event.emit();
    })
  }
}
