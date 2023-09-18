import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";


@Component({
	selector: 'app-services-popup',
	templateUrl: './services-popup.component.html',
	styleUrls: ['./services-popup.component.scss']
})
export class ServicesPopupComponent implements OnInit {

	popupServiceForm = this.fb.group({
		service: [{ value: '', disabled: false }],
		name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]+$')]],
		phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
	});

	popup: boolean = true;
	popupValid: boolean = false;

	constructor(private dialogRef: MatDialog,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: { name: string }) {
	}

	ngOnInit() {
		this.popupServiceForm.patchValue({ service: this.data.name });
	}

	closedDialog() {
		this.dialogRef.closeAll();
	}

	orderPopupValid() {
		this.popup = false;
		this.popupValid = true;
	}

  servicesCards = [
    {
      title: 'Создание сайтов',
    },
    {
      title: 'Продвижение',
    },
    {
      title: 'Реклама',
    },
    {
      title: 'Копирайтинг',
    }
  ]

}
