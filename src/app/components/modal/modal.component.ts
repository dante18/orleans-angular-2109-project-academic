import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input('id') idModal = "";
  @Input('title') titleModal = "";
  @Input('type') typeModal = "";
  @Output() eventResponse = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Manage clicks inside the modal
   *
   * @param $event
   */
  handlerClick($event: any) {
    this.eventResponse.emit({choice: $event.target.innerText})
  }
}
