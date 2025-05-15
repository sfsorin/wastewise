/**
 * Tipuri pentru entități geografice
 */

export interface Judet {
  id: number;
  nume: string;
  cod: string;
  populatie?: number;
  suprafata?: number;
  localitati?: Localitate[];
  uatUri?: UAT[];
}

export interface Localitate {
  id: number;
  nume: string;
  judetId: number;
  judet?: Judet;
  tip: 'MUNICIPIU' | 'ORAS' | 'COMUNA' | 'SAT';
  codPostal?: string;
  populatie?: number;
  latitudine?: number;
  longitudine?: number;
}

export interface UAT {
  id: number;
  nume: string;
  codSiruta: string;
  judetId: number;
  judet?: Judet;
  localitateId: number;
  localitate?: Localitate;
  populatie?: number;
  suprafata?: number;
  adresa?: string;
  telefon?: string;
  telefonSecundar?: string;
  email?: string;
  emailSecundar?: string;
  codFiscal?: string;
  zonaAdiId?: number;
  zonaAdi?: ZonaADI;
  zonaIridexId?: number;
  zonaIridex?: ZonaIridex;
}

export interface ZonaADI {
  id: number;
  nume: string;
  cod: string;
  descriere?: string;
  uatUri?: UAT[];
}

export interface ZonaIridex {
  id: number;
  nume: string;
  cod: string;
  descriere?: string;
  uatUri?: UAT[];
}

export interface JudetListResponse {
  items: Judet[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LocalitateListResponse {
  items: Localitate[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UATListResponse {
  items: UAT[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ZonaADIListResponse {
  items: ZonaADI[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ZonaIridexListResponse {
  items: ZonaIridex[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GeographicFilters {
  search?: string;
  judetId?: number;
  tip?: 'MUNICIPIU' | 'ORAS' | 'COMUNA' | 'SAT';
  zonaAdiId?: number;
  zonaIridexId?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  pageSize?: number;
}
