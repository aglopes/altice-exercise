import { Component, OnInit } from '@angular/core';
import * as json_data from "../../../assets/fixed_data.json";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public data: Array<object> = []; //all data
  public filteredData: Array<object> = []; //used for type filters and search inputs we setup pagedData threw this...
  public searchData: Array<object> = [];
  public pagedData: Array<Array<object>> = [];//data in array for each page
  public pageData: Array<object> = []; //single page data
  public pageNumber: number  = 1; //current page number
  private pages: number = 3; //cards per page
  public numberPages: number = 0; //total pages that we can visualize
  public season: string = "all"; //lets setup all season type as default value
  public search: string = "";
  constructor(private route: ActivatedRoute) {

  }
  setupData(){
    this.data = JSON.parse(JSON.stringify(json_data)).default.data;
    this.searchData = this.data.filter((d) => d["title"].includes(this.search) || d["description"].includes(this.search) || d["category"].includes(this.search));
  }
  setupSeasonData(){
    switch(this.season){
      case "all":
        this.filteredData = this.searchData;
        break;
      case "summer":
        this.filteredData = this.searchData.filter((d) => d["category"].includes("summer"));
        break;
      case "winter":
        this.filteredData = this.searchData.filter((d) => d["category"].includes("winter"));
        break;
      case "autumn":
        this.filteredData = this.searchData.filter((d) => d["category"].includes("autumn"));
        break;
      case "spring":
        this.filteredData = this.searchData.filter((d) => d["category"].includes("spring"));
        break;
      default:
        this.filteredData = this.searchData;
        break;
    }
  }
  setupParameters(){
    //if page param suported <=0
    if(this.pageNumber <= 0){
      this.pageNumber = 1;
    }
    //lets setup max page size..
    let res: number = Number(this.filteredData.length/this.pages);
    let dif: number = res - Math.round(res); //is something more to view
    this.numberPages = Math.round(res);
    if (dif > 0){//a page with less then 3 cards
      this.numberPages = this.numberPages + 1;
    }
    //if page param suported > pagemax
    if( this.pageNumber > (this.filteredData.length /this.pages) ){
      this.pageNumber = this.numberPages;
    }
  }
  setupPagedData(){
    let n: number = this.filteredData.length;
    let page: Array<object> = [];
    for(let i=0; i<n; i++){
      if (page.length < 3){
        page.push(this.filteredData[i]);
      }else{
        this.pagedData.push(page);
        page = [];
        page.push(this.filteredData[i]);
      }
    }
    if(page.length > 0){
      this.pagedData.push(page);
    }
    //page test
  }
  setupCurrentViewData(){
    this.pageData = this.pagedData[(this.pageNumber-1)];
  }
  pageChanged(data){
    //fornot get event to previous and next
    if (data == -1){//previous event
      this.pageNumber = this.pageNumber -1;
    }else if (data == -2){//next event
      this.pageNumber = this.pageNumber +1;
    }else{
      this.pageNumber = data;
    }
    this.setupCurrentViewData();
  }
  searchChanged(data){
    this.search = data;
    this.searchData = this.data.filter((d) => d["title"].includes(this.search) || d["description"].includes(this.search) || d["category"].includes(this.search));
    this.filteredData = [];
    this.pagedData = [];
    this.pageData = [];
    this.setupSeasonData();
    this.setupParameters();
    this.setupPagedData();
    this.setupCurrentViewData();
  }
  ngOnInit(): void {
    this.setupData();
    this.route.queryParams.subscribe(params => {
      this.pageNumber = Number(params['page']) || 1;
      this.season = params['season'] || "all";
      let seasonsArray: Array<string> = ["all", "spring", "summer",  "autumn", "winter"];
      if(!seasonsArray.includes(this.season)){
        this.season = "all";
      }
      //this can be in constructor or OnInit()
      this.filteredData = [];
      this.pagedData = [];
      this.pageData = [];
      this.setupSeasonData();
      this.setupParameters();
      this.setupPagedData();
      this.setupCurrentViewData();
    });
  }
}
