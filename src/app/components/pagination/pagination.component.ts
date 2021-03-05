import { Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() npages: number;
  @Input() currentPage: number;
  @Input() season: string;
  @Output() paginateEvent = new EventEmitter<number>();
  pages: Array<number> = [];
  constructor() {

  }
  paginateClicked(page: number){
    this.paginateEvent.emit(page);
  }
  ngOnChanges(): void{
    this.pages = Array(this.npages).fill(1).map((x,i)=> i+1);
  }
  ngOnInit(): void {

  }

}
