import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { SondageService } from '../services/sondage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Lieux {
  value: string;
  viewValue: string;
  id: number;
}

interface ToSend{
  id: number;
}

@Component({
  selector: 'app-dialogSondage',
  templateUrl: './dialogSondage.component.html',
  styleUrls: ['./dialogSondage.component.css']
})

export class DialogSondageComponent implements OnInit {
  lieux: Lieux[] = [];
  lieuxChoisis : any[] = [];
  dateChoisis: any[] = [];

  secondFormGroup = new FormGroup({
    lieuControl : new FormControl('', Validators.required)
  });

  isLinear = true;
  firstFormGroup = new FormGroup({
    nomControl : new FormControl('', Validators.required)
  });
  //secondFormGroup: FormGroup;
  thirdFormGroup= new FormGroup({
    dateControl : new FormControl('', Validators.required)
  });

  fourthFormGroup= new FormGroup({
    descriptionControl : new FormControl('', Validators.required)
  });

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(
    private _snackBar: MatSnackBar, 
    private sondageService : SondageService,
    public dialogRef: MatDialogRef<DialogSondageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });

    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['']
    });

    this.sondageService.getLieux()
    .subscribe(   (next) => {
      var obj = JSON.parse((JSON.stringify(next)));
      obj.forEach(elem => {
        this.lieux.push({id: elem.id, value : elem.id, viewValue: elem.libelleLieu})
      });
    });

  }

  addInput() {
    console.log(this.secondFormGroup.get('secondCtrl').value);
    if (this.secondFormGroup.get('secondCtrl').value != undefined) {
      this.lieuxChoisis.push(this.secondFormGroup.value)
    }
  }

  addInputDate() {
    console.log(this.thirdFormGroup.get('thirdCtrl').value);
    if (this.thirdFormGroup.get('thirdCtrl').value != undefined && this.thirdFormGroup.get('thirdCtrl').value != "") {
      this.dateChoisis.push(this.thirdFormGroup.value)
    } 
  }

  closeDialog() {
    this.dialogRef.close();
    var lieu = [];
    var date = [];

    this.lieuxChoisis.map(elem => {
        var next = {
          id : elem.secondCtrl.id
        }
        lieu.push(next);
    });

    this.dateChoisis.map(elem => {
      var getDate = new Date(elem.thirdCtrl).toLocaleDateString('en-CA');
      var next = {
        date : getDate
      }
      date.push(next);
  });

    var newSondage = {
        description: this.fourthFormGroup.get("fourthCtrl").value,
        nom: this.firstFormGroup.get("firstCtrl").value,
        createurSondage: {"id": this.data[0].createurSondage.id},
        lieu : lieu,
        date: date
    }

    this.sondageService.addSondage(newSondage)
    .subscribe(
      (next)=> {
          console.log(next);
      },
      (error) => {
        console.log(error);
        this.openSnackBar("Erreur lors de la création", "Fermer")
      },
      () => {
        //this.ELEMENT_DATA.splice(this.ELEMENT_DATA.findIndex((elem)=>elem.id = id), 1);
        this.openSnackBar("Sondage crée avec succes", "Fermer");

      }
    )
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
