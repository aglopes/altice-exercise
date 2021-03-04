import { Component, OnInit } from '@angular/core';
import * as json_data from "../../../assets/fixed_data.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data = '';
  constructor() {

  }

  ngOnInit(): void {
    this.data = JSON.parse(JSON.stringify(json_data)).default.data;
  }

}
