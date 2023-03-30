import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  formModel: FormGroup;

  constructor(){
    this.formModel = new FormGroup({
      placa: new FormControl('',[
        Validators.required,
      ]),

      fecha: new FormControl('',[
        Validators.required
      ]),

      hora: new FormControl('', [
        Validators.required
      ])

      
    }, [])
  }

  ngOnInit(): void {

  }

  getDataForm(){
    console.log(this.formModel.value)
  }


  checkControl(pControlName: string, pError: string) : boolean{
    if(this.formModel.get(pControlName)?.hasError(pError) && this.formModel.get(pControlName)?.touched){
      return true
    }else{
      return false
    }
  }

}
