
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularioFiliacao } from '../models/formularioFiliacao';
import { Participante } from '../models/participante';
import { environment } from '../../../environments/environment'

interface Resposta {
  participante: Participante;
  status: String,
  protocoloFiliacao: String,
  protocoloCapec: String,
  erro: String;
}



const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class FiliacaoService {

  constructor(private http: HttpClient) { }


  participantePorCpf(cpf: string): Observable<Resposta> {
    return this.http.get<Resposta>(`${API}filiacao/${cpf}/participante`);
  }


  registrarParticipante(participante: FormularioFiliacao): Observable<Resposta> {
    return this.http.post<Resposta>(`${API}filiacao/grava-participante`, participante);
  }

}
