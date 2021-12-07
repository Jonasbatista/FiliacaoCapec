
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormularioFiliacao } from '../models/formularioFiliacao';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
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

  habilitaBtnContinuar: boolean = true;
  regimeTributacaoEscolhido!: string;
  cienteFormulario!: string;
  escolherRegimeTributacao!: string;
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
      nome: new FormControl(),
      cpf: new FormControl(),
      dataNascimento: new FormControl(),
      email: new FormControl(),
      telefone: new FormControl(),
      nroProtocolo: '',
      tributacao: this.fb.group({
        cienteFormulario: new FormControl(),
        regimeTributacaoEscolhido: new FormControl(),
        escolherRegimeTributacao: new FormControl()
      })
    });
  }

  ngOnInit(): void {
  }

  limparFormulario() {
    this.formularioParticipante.reset();
    this.formParticipante.resetForm();
    this.habilitaBtnContinuar = true;
  }

  resetRadioButton() {
    this.formularioParticipante.get('tributacao.cienteFormulario')?.reset();
    this.formularioParticipante.get('tributacao.regimeTributacaoEscolhido')?.reset();
    this.habilitaBtnContinuar = true;
  }

  validaFormulario() {
    if ((this.formularioParticipante.value.nome) &&
      (this.formularioParticipante.value.cpf) &&
      (this.formularioParticipante.value.dataNascimento) &&
      (this.formularioParticipante.value.email) &&
      (this.formularioParticipante.value.telefone) &&
      ((this.formularioParticipante.value.tributacao.regimeTributacaoEscolhido) ||
        (this.formularioParticipante.value.tributacao.regimeTributacaoEscolhido === null))) {
      console.log('validaFormulario')
      this.habilitaBtnContinuar = false;
    }
  }

  /*
    validaParticipante() {

      this.filiacaoService.participantePorCpf(this.formularioParticipante.value.cpf).subscribe(
        (p) => {
          if (p.erro) {
            this.snackBar.open(`${p.erro}`, 'Ok', { duration: 3000 })
            this.limparFormulario();
          }
          else {
            this.exibeFiliacao = false;
            this.exibeCapec = true;
          }
        },
        (err) => {
          console.log(err.error.message);
        }
      )
    }
  */
  onSubmit() {

    this.filiacaoService.participantePorCpf(this.formularioParticipante.value.cpf).subscribe(
      (p) => {
        if (p.erro) {
          console.log('entrou aqui')
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
            regTributacao: this.formularioParticipante.value.tributacao.regimeTributacaoEscolhido,
            nroProtocolo: '0000000'
          }

          this.exibeCapec = true;
          /* this.filiacaoService.registrarParticipante(formulario).subscribe(
            (p) => {
              this.protocoloFiliacao = p.protocolo;
              this.exibeFiliacao = false;
              this.exibeCapec = true;
            }
          ) */
          console.log(formulario);
        }
      },
      (err) => {
        console.log(err.error.message);
      }
    )
  }

}
