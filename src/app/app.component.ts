import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  navbarButtonToggleCssClassList = "hamburger hamburger--elastic navbar-toggler";
  navbarContentCssClassList = "navbar-collapse collapse";

  constructor() {}

  /**
   * manage 'click' events on the navbar
   *
   * @param $event
   */
  navbarButtonToggleHandlerClick($event: any)
  {
    let parent = $event.target.closest("button");

    if (parent.classList.contains("is-active")) {
      this.navbarButtonToggleCssClassList = "hamburger hamburger--elastic navbar-toggler";
    } else {
      this.navbarButtonToggleCssClassList = "hamburger hamburger--elastic navbar-toggler is-active";
    }

    if (document.querySelector("#navbarSupportedContent")!.classList.contains("show")) {
      this.navbarContentCssClassList = "navbar-collapse collapse";
    } else {
      this.navbarContentCssClassList = "navbar-collapse collapse show";
    }
  }
}
