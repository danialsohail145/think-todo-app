import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
constructor(private modalService: NgbModal){

}
open() {
  const modalRef = this.modalService.open(ContentComponent,{ size: 'lg' });
  modalRef.componentInstance.name = 'World';
}
}
