import api from '../api';
import {
  Judet,
  Localitate,
  UAT,
  ZonaADI,
  ZonaIridex,
  JudetListResponse,
  LocalitateListResponse,
  UATListResponse,
  ZonaADIListResponse,
  ZonaIridexListResponse,
  GeographicFilters,
} from '../../types/geographic.types';

const JUDETE_URL = '/geographic/judete';
const LOCALITATI_URL = '/geographic/localitati';
const UAT_URL = '/geographic/uat';
const ZONA_ADI_URL = '/geographic/zone-adi';
const ZONA_IRIDEX_URL = '/geographic/zone-iridex';

/**
 * Serviciu pentru gestionarea entităților geografice
 */
export const geographicService = {
  /**
   * Obține lista de județe cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getJudete: (filters?: GeographicFilters): Promise<JudetListResponse> => {
    return api.get(JUDETE_URL, filters);
  },

  /**
   * Obține un județ după ID
   * @param id ID-ul județului
   */
  getJudetById: (id: number): Promise<Judet> => {
    return api.get(`${JUDETE_URL}/${id}`);
  },

  /**
   * Obține lista de localități cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getLocalitati: (filters?: GeographicFilters): Promise<LocalitateListResponse> => {
    return api.get(LOCALITATI_URL, filters);
  },

  /**
   * Obține o localitate după ID
   * @param id ID-ul localității
   */
  getLocalitateById: (id: number): Promise<Localitate> => {
    return api.get(`${LOCALITATI_URL}/${id}`);
  },

  /**
   * Obține localitățile dintr-un județ
   * @param judetId ID-ul județului
   */
  getLocalitatiByJudet: (judetId: number): Promise<Localitate[]> => {
    return api.get(`${JUDETE_URL}/${judetId}/localitati`);
  },

  /**
   * Obține lista de UAT-uri cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getUATs: (filters?: GeographicFilters): Promise<UATListResponse> => {
    return api.get(UAT_URL, filters);
  },

  /**
   * Obține un UAT după ID
   * @param id ID-ul UAT-ului
   */
  getUATById: (id: number): Promise<UAT> => {
    return api.get(`${UAT_URL}/${id}`);
  },

  /**
   * Obține UAT-urile dintr-un județ
   * @param judetId ID-ul județului
   */
  getUATsByJudet: (judetId: number): Promise<UAT[]> => {
    return api.get(`${JUDETE_URL}/${judetId}/uat`);
  },

  /**
   * Obține lista de zone ADI cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getZoneADI: (filters?: GeographicFilters): Promise<ZonaADIListResponse> => {
    return api.get(ZONA_ADI_URL, filters);
  },

  /**
   * Obține o zonă ADI după ID
   * @param id ID-ul zonei ADI
   */
  getZonaADIById: (id: number): Promise<ZonaADI> => {
    return api.get(`${ZONA_ADI_URL}/${id}`);
  },

  /**
   * Obține lista de zone Iridex cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getZoneIridex: (filters?: GeographicFilters): Promise<ZonaIridexListResponse> => {
    return api.get(ZONA_IRIDEX_URL, filters);
  },

  /**
   * Obține o zonă Iridex după ID
   * @param id ID-ul zonei Iridex
   */
  getZonaIridexById: (id: number): Promise<ZonaIridex> => {
    return api.get(`${ZONA_IRIDEX_URL}/${id}`);
  },
};

export default geographicService;
