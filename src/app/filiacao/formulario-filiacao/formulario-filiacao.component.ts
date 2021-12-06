
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioFiliacao } from '../models/formularioFiliacao';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiliacaoService } from '../services/filiacao.service';
import { Participante } from '../models/participante';

@Component({
  selector: 'app-formulario-filiacao',
  templateUrl: './formulario-filiacao.component.html',
  styleUrls: ['./formulario-filiacao.component.css']
})
export class FormularioFiliacaoComponent implements OnInit {

  @ViewChild('formParticipante') formParticipante!: FormGroupDirective;


  cpfParticipante!: string;
  radioForm!: any;
  formularioParticipante: FormGroup;
  participante!: Participante;
  protocoloFiliacao!: string;


  exibeFiliacao: boolean = true;
  exibeCapec: boolean = false;

  exibeFormularioCapec: boolean = false

  constructor(
    private filiacaoService: FiliacaoService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.formularioParticipante = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      regTributacao: ['', [Validators.required]],
      nroProtocolo: ''
    });
  }

  ngOnInit(): void {
  }


  limparFormulario() {
    this.formularioParticipante.reset();
    this.formParticipante.resetForm();
  }

  onSubmit() {

    this.filiacaoService.participantePorCpf(this.cpfParticipante).subscribe(
      (p) => {
        if (p.erro) {
          this.snackBar.open(`${p.erro}`, 'Ok', { duration: 3000 })
          this.limparFormulario();
        }
        else {
          this.exibeFiliacao = false;
          this.exibeCapec = true;
          let formulario: FormularioFiliacao = {
            nome: this.formularioParticipante.value.nome,
            CPF: this.formularioParticipante.value.cpf,
            dataNascimento: this.formularioParticipante.value.dataNascimento,
            email: this.formularioParticipante.value.email,
            telefone: this.formularioParticipante.value.telefone,
            regTributacao: this.formularioParticipante.value.regTributacao,
            nroProtocolo: '0000000'
          }
          this.filiacaoService.registrarParticipante(formulario).subscribe(
            (p) => {
              this.protocoloFiliacao = p.protocolo;
              this.exibeFiliacao = false;
              this.exibeCapec = true;
            }
          )
        }
      },
      (err) => {
        console.log(err.error.message);
      }
    )
  }

}
