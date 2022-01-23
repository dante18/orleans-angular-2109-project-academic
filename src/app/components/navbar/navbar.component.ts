import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  buttonToggleCssClassList = "hamburger hamburger--elastic navbar-toggler";
  navbarContentCssClassList = "navbar-collapse collapse";

  constructor() { }

  ngOnInit(): void {
  }

  buttonToggleHandlerClick($event: any) {
    let parent = $event.target.closest("button");

    if (parent.classList.contains("is-active")) {
      this.buttonToggleCssClassList = "hamburger hamburger--elastic navbar-toggler";
    } else {
      this.buttonToggleCssClassList = "hamburger hamburger--elastic navbar-toggler is-active";
    }

    if (document.querySelector("#navbarSupportedContent")!.classList.contains("show")) {
      this.navbarContentCssClassList = "navbar-collapse collapse";
    } else {
      this.navbarContentCssClassList = "navbar-collapse collapse show";
    }
  }
}
