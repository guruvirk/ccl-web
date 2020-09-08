import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  page: any;

  @Input()
  maxPagesToShow = 10;

  @Output()
  change: EventEmitter<number> = new EventEmitter();

  pages: number[];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {

    if (this.page.page.pageNo < 1) {
      this.page.page.pageNo = 1;
    } else if (this.page.page.pageNo > (this.page.page.total / this.page.page.limit)) {
      this.page.page.pageNo = (this.page.page.total / this.page.page.limit);
    }
    this.calculatePages();
  }

  calculatePages(page?) {

    if (page) {
      this.page = page
    }

    let index: number;

    const pageNos: number[] = [];

    let firstPage = 1;

    let lastPageStatic = Math.trunc(this.page.page.total / this.page.page.limit);
    if ((this.page.page.total % this.page.page.limit) > 0) {
      lastPageStatic++
    }
    const noChangelastPage = lastPageStatic
    let lastPage = lastPageStatic
    this.page.page.totalPages = lastPageStatic

    if (lastPageStatic > this.maxPagesToShow) {
      if (this.page.page.pageNo < this.maxPagesToShow) {
        lastPage = this.maxPagesToShow;
      } else if (this.page.page.pageNo > (lastPageStatic - this.maxPagesToShow)) {
        firstPage = lastPageStatic - this.maxPagesToShow;
      } else {
        firstPage = this.page.page.pageNo - this.maxPagesToShow / 2;
        if (firstPage < 1) { firstPage = 1; }
        lastPage = this.page.page.pageNo + this.maxPagesToShow / 2;
        if (lastPage > lastPageStatic) { lastPage = lastPageStatic; }
      }
      lastPageStatic = lastPage
    }

    if (firstPage !== 1) {
      pageNos.push(-2);
    }

    for (index = firstPage; index <= lastPageStatic; index++) {
      pageNos.push(index);
    }

    if (pageNos.length === 0) {
      pageNos.push(1);
    }

    if (lastPageStatic !== noChangelastPage) {
      pageNos.push(-1);
    }

    // create an array of pages to ng-repeat in the pager control
    this.pages = pageNos;
  }
  showPage(no: number) {

    if (no === -2) {
      no = 1;
    } else if (no === -1) {
      no = this.page.page.totalPages;
    }

    this.page.showPage(no)
  }
}
