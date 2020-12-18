import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SondageService } from '../services/sondage.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface SondagesElements {
  id: Number;
  name: string;
  user: String;
  date: Date;
}

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.scss']
})


export class MonCompteComponent implements OnInit, AfterViewInit {

  static bool: Boolean
  user;
  isAuth : Boolean;
  isError : boolean;
  errorMessage : string;
  mySurvey : Boolean;
  usersList : Boolean;
  infosUser : Boolean;
  ELEMENT_DATA: SondagesElements[] = [];
  SignInForm = new FormGroup({
    id : new FormControl(''),
    civilite: new FormControl(''),
    username: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('')
  });
  displayedColumns: string[] = ['name', 'user', 'date', 'delete'];
  dataSource = new MatTableDataSource<SondagesElements>(this.ELEMENT_DATA);

  constructor(private _snackBar: MatSnackBar, private authService: AuthService, private sondageService: SondageService, private router: Router) {
    this.authService.isAuth.subscribe((val) => {
      this.isAuth = val;
    });
    this.mySurvey = false;
    this.usersList = false;
    this.infosUser = true;
  }

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
    this.sondageService.getAll()
    .subscribe((next)=> {
        var obj = JSON.parse((JSON.stringify(next)));
        obj.forEach(elem => {
          this.ELEMENT_DATA.push({id: elem.id, name : elem.nom, user: elem.createurSondage.nom + " " + elem.createurSondage.prenom, date: elem.date})
        }); 
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.authService.getOwn()
    .subscribe(
      (next) => {
        console.log(next);
        this.isAuth = true;
        this.user = JSON.parse(JSON.stringify(next))
        this.SignInForm.setValue({
          id : this.user.id,
          civilite: this.user.civilite,
          username: this.user.username,
          nom: this.user.nom,
          prenom: this.user.prenom,
          email: this.user.email,
          password: ""
      });
      },
      (error) => {
        //this.isError = true;
        //this.isAuth = false;
        //this.router.navigate(['/auth']);
        this.displayError(error.error);
        
      }
  );
  }

  deleteRow(id) {
    this.sondageService.deleteSondage(id)
    .subscribe(
      (next)=> {
          console.log(next);
          
      },
      (error) => {
        console.log(error);
        this.openSnackBar("Erreur lors de la suppression", "Fermer")
      },
      () => {
        this.ELEMENT_DATA.splice(this.ELEMENT_DATA.findIndex((elem)=>elem.id = id), 1);
        this.ngOnInit();
        this.openSnackBar("Sondage supprimé avec succes", "Fermer");

      }
    )
    
  }
  updateUser() {
    this.authService.updateUser(this.SignInForm.value)
      .subscribe(
        (next) => {
          this.isAuth = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isError = true;
          //this.isAuth = false;
          //this.router.navigate(['/auth']);
          this.displayError(error.error);
          
        }
    );
  }

  afficheSondages() {
    this.usersList = false;
    this.mySurvey = true;
    this.infosUser = false;


    
  }

  afficheListUser() {
    this.usersList = true;
    this.mySurvey = false;
    this.infosUser = false;
  }

  afficheInfos() {
    this.usersList = false;
    this.mySurvey = false;
    this.infosUser = true;
  }

  displayError(msg : string){
    this.errorMessage = msg;
    setTimeout(function() {this.isError = false; console.log(msg);
    }, 500);

  }

}
