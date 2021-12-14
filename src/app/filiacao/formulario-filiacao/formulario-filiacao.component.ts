
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
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

  aguardandoResposta: boolean = false;

  breadCrumbClassPreviFuturo = 'breadCrumbAtivo';
  breadCrumbClassCapec = 'breadCrumbInativo';
  breadCrumbClassResumo = 'breadCrumbInativo';

  deixarPraDepois: boolean = false;

  habilitaBtnContinuar: boolean = true;

  habilitaCampos: boolean = true;

  cpfParticipante!: string;
  radioForm!: any;
  formularioParticipante: FormGroup;
  participante!: Participante;
  protocoloFiliacao!: string;
  formFiliac = {};

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
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: [Validators.required],
      email: ['', [Validators.email]],
      telefone: ['', [Validators.email]],
      nroProtocolo: '',
      tributacao: this.fb.group({
        cienteFormulario: ['', [Validators.required]],
        regimeTributacaoEscolhido: ['', [Validators.required]],
        escolherRegimeTributacao: ['', [Validators.required]]
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
  validaParticipante() {
    this.aguardandoResposta = true;
    this.filiacaoService.participantePorCpf(this.formularioParticipante.value.cpf).subscribe(
      (p) => {
        if (p.protocoloFiliacao) {
          this.aguardandoResposta = false;
          this.habilitaCampos = false;
          console.log(p.participante.dataNascimento);
          this.formularioParticipante.get('dataNascimento')?.setValue(p.participante.dataNascimento);
          this.formularioParticipante.get('email')?.setValue(p.participante.email);
          this.formularioParticipante.get('telefone')?.setValue(p.participante.telefone);

          console.log('Tem Filiação. Protocolo: ' + p.protocoloFiliacao)
          //vai para a tela com os protocolos e oferece a filiação a CAPEC
          this.snackBar.open(`${p.protocoloFiliacao}`, 'Ok', { duration: 6000 })
          if (p.protocoloCapec) {
            console.log('Tem Capec. Protocolo: ' + p.protocoloCapec)
            //vai para a tela com os protocolos informando que já estão registradas as propostas
            this.snackBar.open(`${p.protocoloCapec}`, 'Ok', { duration: 6000 })
          }
          //      this.limparFormulario();
        }
        else {
          this.aguardandoResposta = false;
          console.log('Não efetuou cadastro ainda');
          this.habilitaCampos = false;
          //enviar os dados preenchidos no formulário para pré cadastro
          //this.exibeFiliacao = false;
          //this.exibeCapec = true;

          //this.formFiliac = {
          //  nome: this.formularioParticipante.value.nome,
          //  CPF: this.formularioParticipante.value.cpf,
          //  dataNascimento: this.formularioParticipante.value.dataNascimento,
          //  email: this.formularioParticipante.value.email,
          //  telefone: this.formularioParticipante.value.telefone,
          //  regTributacao: this.formularioParticipante.value.tributacao.regimeTributacaoEscolhido,
          //  nroProtocolo: '0000000'
          //}

          /* this.filiacaoService.registrarParticipante(formulario).subscribe(
            (p) => {
              this.protocoloFiliacao = p.protocolo;

            }
          ) */
          console.log(this.formFiliac);
        }
      },
      (err) => {
        console.log(err.error.message);
      }
    )
  }

  onSubmit() {

    this.formFiliac = {
      nome: this.formularioParticipante.value.nome,
      CPF: this.formularioParticipante.value.cpf,
      dataNascimento: this.formularioParticipante.value.dataNascimento,
      email: this.formularioParticipante.value.email,
      telefone: this.formularioParticipante.value.telefone,
      regTributacao: this.formularioParticipante.value.tributacao.regimeTributacaoEscolhido,
      nroProtocolo: '0000000'
    }


    this.breadCrumbClassPreviFuturo = 'breadCrumbFinalizado';
    this.breadCrumbClassCapec = 'breadCrumbAtivo';
    this.exibeFiliacao = false;
    this.exibeCapec = true;

  }



}
