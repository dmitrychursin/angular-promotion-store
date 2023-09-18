import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";


@Component({
	selector: 'app-footer-popup',
	templateUrl: './footer-popup.component.html',
	styleUrls: ['./footer-popup.component.scss']
})
export class FooterPopupComponent {

	popup: boolean = true;
	popupValid: boolean = false;

	popupForm = this.fb.group({
		name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]+$')]],
		phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
	});

	constructor(private fb: FormBuilder,
		private dialogRef: MatDialog) {
	}

	closedDialog() {
		this.dialogRef.closeAll();
	}

	orderPopupValid() {
		this.popup = false;
		this.popupValid = true;
	}
}
