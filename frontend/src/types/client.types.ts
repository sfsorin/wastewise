/**
 * Tipuri pentru clienți și puncte de colectare
 */

import { Judet, Localitate } from './geographic.types';

export interface TipClient {
  id: number;
  nume: string;
  descriere?: string;
}

export interface Client {
  id: number;
  nume: string;
  tipClientId: number;
  tipClient?: TipClient;
  cui?: string;
  cnp?: string;
  adresa: string;
  judetId: number;
  judet?: Judet;
  localitateId: number;
  localitate?: Localitate;
  codPostal?: string;
  telefon?: string;
  email?: string;
  reprezentantLegal?: string;
  iban?: string;
  banca?: string;
  observatii?: string;
  puncteColectare?: PunctColectare[];
  createdAt: string;
  updatedAt: string;
}

export interface PunctColectare {
  id: number;
  clientId: number;
  client?: Client;
  nume: string;
  adresa: string;
  judetId: number;
  judet?: Judet;
  localitateId: number;
  localitate?: Localitate;
  codPostal?: string;
  latitudine?: number;
  longitudine?: number;
  persoanaContact?: string;
  telefonContact?: string;
  emailContact?: string;
  observatii?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDto {
  nume: string;
  tipClientId: number;
  cui?: string;
  cnp?: string;
  adresa: string;
  judetId: number;
  localitateId: number;
  codPostal?: string;
  telefon?: string;
  email?: string;
  reprezentantLegal?: string;
  iban?: string;
  banca?: string;
  observatii?: string;
}

export interface UpdateClientDto {
  nume?: string;
  tipClientId?: number;
  cui?: string;
  cnp?: string;
  adresa?: string;
  judetId?: number;
  localitateId?: number;
  codPostal?: string;
  telefon?: string;
  email?: string;
  reprezentantLegal?: string;
  iban?: string;
  banca?: string;
  observatii?: string;
}

export interface CreatePunctColectareDto {
  clientId: number;
  nume: string;
  adresa: string;
  judetId: number;
  localitateId: number;
  codPostal?: string;
  latitudine?: number;
  longitudine?: number;
  persoanaContact?: string;
  telefonContact?: string;
  emailContact?: string;
  observatii?: string;
}

export interface UpdatePunctColectareDto {
  nume?: string;
  adresa?: string;
  judetId?: number;
  localitateId?: number;
  codPostal?: string;
  latitudine?: number;
  longitudine?: number;
  persoanaContact?: string;
  telefonContact?: string;
  emailContact?: string;
  observatii?: string;
}

export interface ClientListResponse {
  items: Client[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PunctColectareListResponse {
  items: PunctColectare[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ClientFilters {
  search?: string;
  tipClientId?: number;
  judetId?: number;
  localitateId?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  pageSize?: number;
}
