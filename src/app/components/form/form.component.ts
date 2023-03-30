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

    const { placa, fecha, hora } = this.formModel.value;
    
    // Obtenemos el último dígito de la placa
    const ultimoDigitoPlaca: number = Number(placa.charAt(placa.length - 1));
    
    // Verificamos si la fecha corresponde a un día en el que aplica el Pico y Placa
    const diaSemana = new Date(fecha);
    const diaEnNumero = diaSemana.getDay(); //transforma el dia en un numero del 0 al 6 siendo lunes = 0 y asi sucesivamente.
    const aplicaPicoPlaca: boolean = ((diaEnNumero >= 1 && diaEnNumero <= 5) || diaEnNumero == 0) && hora >= '07:00' && hora <= '09:30' || hora >= '16:00' && hora <= '19:30';
    
    // Verificamos si la placa está restringida para circular en la fecha y hora especificadas
    const puedeCircular: boolean = 
    (ultimoDigitoPlaca % 2 == 0 && diaEnNumero == 1 || ultimoDigitoPlaca % 2 == 0 && diaEnNumero == 3 || ultimoDigitoPlaca % 2 == 0 && diaEnNumero == 5) || 
    (ultimoDigitoPlaca % 2 == 1 && diaEnNumero == 2 || ultimoDigitoPlaca % 2 == 1 && diaEnNumero == 4 || ultimoDigitoPlaca % 2 == 1 && diaEnNumero == 0);

    // Construimos el mensaje de acuerdo al resultado de la verificación
    let mensaje: string = "";
    if (aplicaPicoPlaca && !puedeCircular) {
      mensaje = "No puede circular debido a la restricción de Pico y Placa.";
    } else {
      mensaje = "Puede circular sin restricciones.";
    }

    console.log(mensaje);
  }


  checkControl(pControlName: string, pError: string) : boolean{
    if(this.formModel.get(pControlName)?.hasError(pError) && this.formModel.get(pControlName)?.touched){
      return true
    }else{
      return false
    }
  }

}
