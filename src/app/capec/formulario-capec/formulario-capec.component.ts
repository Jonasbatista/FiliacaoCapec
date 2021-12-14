import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioFiliacao } from 'src/app/filiacao/models/formularioFiliacao';
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

  @Input() formParticipante!: any;  /// ALINHAR ISSO AQUI!!!!!



  aderirCapec: string = '';
  beneficiarios: FormularioBeneficiario[] = [];
  labelBtnIncluirBeneficiario: string = 'INCLUIR';

  vinculos: Vinculo[] = [
    { vlr: 1, display: 'Mãe' },
    { vlr: 2, display: 'Pai' },
    { vlr: 3, display: 'Irmão' },
    { vlr: 4, display: 'Irmã' }

  ];

  formularioCapec: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioCapec = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      vinculo: ['', [Validators.required]],
      percentual: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
    console.log(this.formParticipante);
  }

  incluirBeneficiario() {

    this.labelBtnIncluirBeneficiario = 'INCLUIR + 1 BENEFICIÁRIO';

    this.beneficiarios.push(this.formularioCapec.value);
    this.limparFormulario();

    // verificar o percentual total gravado:
    /*
    this.formularioCapec.value.beneficiario.forEach((element: any) => {
      totalPercentual = totalPercentual + element.percentual;
    });
*/

    console.log(this.beneficiarios);

  }

  limparFormulario() {
    this.formularioCapec.reset();
  }

  valoresCapec() {

  }

  mudou2() {
    console.log('mudou 2')
  }

}
