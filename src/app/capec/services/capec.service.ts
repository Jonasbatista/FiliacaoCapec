import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularioBeneficiario } from '../models/beneficiario';
import { environment } from '../../../environments/environment';

interface Resposta {
  beneficiario: FormularioBeneficiario,
  protocolo: string,
  erro: string
}

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CapecService {

  constructor(private http: HttpClient) { }

  registrarParticipante(beneficiario: FormularioBeneficiario): Observable<Resposta> {
    console.log(beneficiario);
    return this.http.post<Resposta>(`${API}capec/grava-beneficiario`, beneficiario);
  }
}
