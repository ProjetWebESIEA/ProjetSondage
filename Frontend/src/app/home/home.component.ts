import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { SondageService } from '../services/sondage.service';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogSondageComponent } from '../dialog/dialogSondage.component';
import { VoteService } from '../services/vote.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from "jquery";

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
  votesList;
  

  constructor(private _snackBar: MatSnackBar, private sondageService: SondageService, private voteService : VoteService, public dialog: MatDialog) {}

  ngOnInit() {
    this.voteService.getOwnVotes()
    .subscribe(
      (next) => {
        this.votesList = next;
        this.sondageService.getAll()
        .subscribe(
          (next) => {
            this.sondageList = next;
            this.sondagesVote();
          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
  }

  sondagesVote() {
    this.sondageList.map(sond => {
      this.votesList.map(vot => {
        if (sond.id == vot.sondage.id) {
          var voted = {
            voted_lieu : vot.lieu,
            voted_date : vot.date,
            isVoted : true
          }
          $.extend(sond, voted);
        }
        
      })
    })
  }

  openModal(): void {
    const dialogRef = this.dialog.open(DialogSondageComponent, {
      height: '300px',
      width: '900px',
      data: this.sondageList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  voter(idLieu, idDate, idSondage): void {
    var vote = {
      votant: {"id":1},
      sondage: {"id":idSondage},
      lieu : {"id":idLieu},
      date: {"id": idDate}
  }
    this.voteService.voter(vote)
    .subscribe(
      (next) => {
        this.ngOnInit();
        this.openSnackBar("Vote effectué avec succés", "Fermer");
      },
      (error) => {
        this.openSnackBar("Une erreur s'est produite", "Fermer");
      }
    );
  }

}
