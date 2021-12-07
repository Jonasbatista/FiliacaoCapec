import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioBeneficiario } from '../models/beneficiario'

interface Vinculo {
  vlr: number, display: string
}

@Component({
  selector: 'app-formulario-capec',
  templateUrl: './formulario-capec.component.html',
  styleUrls: ['./formulario-capec.component.css']
})
export class FormularioCapecComponent implements OnInit {

  @Input() cpfParticipante!: string;
  @Input() protocoloFiliacao!: string;

  vinculos: Vinculo[] = [
    { vlr: 1, display: 'Mãe' },
    { vlr: 2, display: 'Pai' },
    { vlr: 3, display: 'Irmão' },
    { vlr: 4, display: 'Irmã' }

  ];

  formularioCapec = this.fb.group({
    beneficiario: this.fb.array([
      this.fb.group({
        nome: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        dataNascimento: ['', [Validators.required]],
        vinculo: ['', [Validators.required]],
        percentual: ['', [Validators.required]],
        cpfParticipante: []
      })
    ])
  });

  beneficiario = this.formularioCapec.get('beneficiario') as FormArray;

  constructor(private fb: FormBuilder) {
    this.formularioCapec.get('beneficiario') as FormArray;

  }

  ngOnInit(): void {
  }

  adicionaBeneficiario() {
    this.beneficiario.push(
      this.fb.group({
        nome: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        dataNascimento: ['', [Validators.required]],
        vinculo: ['', [Validators.required]],
        percentual: ['', [Validators.required]],
        cpfParticipante: []
      })
    );
  }


  retiraBeneficiario(index: number) {
    this.beneficiario.removeAt(index);
  }

  submit() {

    //let totalPercentual: number = 0;

    let formulario = {
      ... this.formularioCapec.value
    }


    // verificar o percentual total gravado:
    /*
    this.formularioCapec.value.beneficiario.forEach((element: any) => {
      totalPercentual = totalPercentual + element.percentual;
    });
*/

    console.log(this.protocoloFiliacao);
    console.log(formulario);

  }

  limparFormulario() {
    this.formularioCapec.reset();
  }

}
