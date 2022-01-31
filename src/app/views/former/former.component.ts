import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-former',
  templateUrl: './former.component.html',
  styleUrls: ['./former.component.css']
})
export class FormerComponent implements OnInit {
  formerList: any;

  constructor() { }

  ngOnInit(): void {
    this.formerList = [];
  }

}
