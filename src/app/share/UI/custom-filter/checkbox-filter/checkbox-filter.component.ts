import {Component, Input, OnInit} from '@angular/core';
import {DataSourceFilter} from "../../../model/common/data-source-filter.model";
import {DomSanitizer} from "@angular/platform-browser";
import {QueryStorageService} from "../../../services/query-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit {
  @Input() dataSource: DataSourceFilter[];
  @Input() paramName: string;
  queryParams: any;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryParams = Object.assign({}, params);
    })
  }

  onCheckboxChange($event: any) {
    this.queryParams[this.paramName] = this.queryParams[this.paramName] ? this.queryParams[this.paramName] : [];
    let uniqueValue;
    if ($event.target.checked) {
      uniqueValue = Array.from(new Set(this.queryParams[this.paramName].concat($event.target.value)));
    } else {
      this.queryParams[this.paramName] = this.queryParams[this.paramName].filter(value => {
        return value !== $event.target.value
      });
      uniqueValue = [...new Set(this.queryParams[this.paramName])];
    }

    this.queryParams[this.paramName] = uniqueValue.length !== 0 ? uniqueValue : undefined;
    this.router.navigate([], {queryParams: this.queryParams, queryParamsHandling: "merge"}).then()
  }
}
