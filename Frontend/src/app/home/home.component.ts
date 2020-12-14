import { Component, OnInit, Inject } from '@angular/core';
import { SondageService } from '../services/sondage.service';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogSondageComponent } from '../dialog/dialogSondage.component';

export interface DialogData {
  lieu: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  lieu: string;
  name: string;

  sondageList;
  constructor(private sondageService: SondageService, public dialog: MatDialog) {}

  ngOnInit() {
   this.sondageService.getAll()
    .subscribe(
      (next) => {
        console.log(next);
        this.sondageList = next;
      },
      (error) => {
        //this.isError = true;
        //this.displayError(error.error);
      }
    );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(DialogSondageComponent, {
      height: '300px',
      width: '900px',
      data: {name: this.name, lieu: this.lieu}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
