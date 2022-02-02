import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input('title') titleDataTable = "";
  @Input('colname') colDataTable = "";
  @Input('content') contentDataTable = "";
  constructor() { }

  ngOnInit(): void {
  }

  eventSearchHandler(formSearch: NgForm) {

  }
}
