import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QueryParams} from "../model/common/query-params.model";

@Directive({
  selector: '[appSort]'
})
export class SortDirective implements OnInit {

  @Input('appSort') sortActive: string;
  @Input('isDefaultSort') isDefaultSort: boolean = false;
  private sortDirection: string;
  private originalHeader: string;

  constructor(private el: ElementRef, private router: Router, private route: ActivatedRoute, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.originalHeader = this.elementRef.nativeElement.innerHTML;
    this.elementRef.nativeElement.classList.add("cursor-pointer", "select-none");
    this.elementRef.nativeElement.setAttribute('name', 'sortElement');

    if(this.isDefaultSort && !this.route.snapshot.queryParams["sort_active"]) {
      this.sortDirection = 'asc';
      this.sort();
    }

    this.route.queryParams.subscribe((params: QueryParams) => {
      if (params.sort_active === this.sortActive) {
        this.updateSortIcon();
      } else {
        this.sortDirection = undefined;
        this.elementRef.nativeElement.innerHTML = this.originalHeader + `&nbsp;<i class="fa-solid fa-sort"></i>`;
      }
    });
  }

  private updateSortIcon() {
    this.sortDirection = this.route.snapshot.queryParams["sort_direction"];

    let directionText;
    if (this.sortDirection === 'asc') {
      directionText = `&nbsp;<i class="fa-solid fa-sort-up"></i>`
    } else if (this.sortDirection === 'desc') {
      directionText = `&nbsp;<i class="fa-solid fa-sort-down"></i>`
    } else {
      directionText = `&nbsp;<i class="fa-solid fa-sort"></i>`
    }
    this.elementRef.nativeElement.innerHTML = this.originalHeader + directionText;
  }

  @HostListener('click') onClick() {
    this.sort();
  }

  private sort() {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    const currentQueryParams = {...currentUrlTree.queryParams};
    currentQueryParams['sort_active'] = this.sortActive;

    if (!this.sortDirection || this.sortDirection === '') {
      this.sortDirection = 'asc'
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc'
    } else {
      this.sortDirection = undefined;
    }

    currentQueryParams['sort_direction'] = this.sortDirection;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: currentQueryParams
    }).then(() => {
      this.updateSortIcon();
    });
  }
}
