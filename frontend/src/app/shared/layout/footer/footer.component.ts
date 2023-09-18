import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FooterPopupComponent} from "../../components/footer-popup/footer-popup.component";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private dialogRef: MatDialog) {
  }

  openDialog() {
    this.dialogRef.open(FooterPopupComponent, {
      disableClose: true
    });
  }

}
