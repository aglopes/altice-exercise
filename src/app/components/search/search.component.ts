import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  
  constructor() { }
  onSearchChange(value: string){
    this.searchEvent.emit(value);
  }
  ngOnInit(): void {
  }

}
