import api from '../api';
import {
  Client,
  PunctColectare,
  TipClient,
  CreateClientDto,
  UpdateClientDto,
  CreatePunctColectareDto,
  UpdatePunctColectareDto,
  ClientListResponse,
  PunctColectareListResponse,
  ClientFilters,
} from '../../types/client.types';

const CLIENTS_URL = '/clients';
const PUNCTE_COLECTARE_URL = '/puncte-colectare';
const TIP_CLIENT_URL = '/tip-client';

/**
 * Serviciu pentru gestionarea clienților și punctelor de colectare
 */
export const clientService = {
  /**
   * Obține lista de clienți cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getClients: (filters?: ClientFilters): Promise<ClientListResponse> => {
    return api.get(CLIENTS_URL, filters);
  },

  /**
   * Obține un client după ID
   * @param id ID-ul clientului
   */
  getClientById: (id: number): Promise<Client> => {
    return api.get(`${CLIENTS_URL}/${id}`);
  },

  /**
   * Creează un client nou
   * @param clientData Date pentru clientul nou
   */
  createClient: (clientData: CreateClientDto): Promise<Client> => {
    return api.post(CLIENTS_URL, clientData);
  },

  /**
   * Actualizează un client existent
   * @param id ID-ul clientului
   * @param clientData Date pentru actualizare
   */
  updateClient: (id: number, clientData: UpdateClientDto): Promise<Client> => {
    return api.put(`${CLIENTS_URL}/${id}`, clientData);
  },

  /**
   * Șterge un client
   * @param id ID-ul clientului
   */
  deleteClient: (id: number): Promise<void> => {
    return api.del(`${CLIENTS_URL}/${id}`);
  },

  /**
   * Obține punctele de colectare ale unui client
   * @param clientId ID-ul clientului
   */
  getClientPuncteColectare: (clientId: number): Promise<PunctColectare[]> => {
    return api.get(`${CLIENTS_URL}/${clientId}/puncte-colectare`);
  },

  /**
   * Obține lista de puncte de colectare cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getPuncteColectare: (filters?: Record<string, unknown>): Promise<PunctColectareListResponse> => {
    return api.get(PUNCTE_COLECTARE_URL, filters);
  },

  /**
   * Obține un punct de colectare după ID
   * @param id ID-ul punctului de colectare
   */
  getPunctColectareById: (id: number): Promise<PunctColectare> => {
    return api.get(`${PUNCTE_COLECTARE_URL}/${id}`);
  },

  /**
   * Creează un punct de colectare nou
   * @param punctData Date pentru punctul de colectare nou
   */
  createPunctColectare: (punctData: CreatePunctColectareDto): Promise<PunctColectare> => {
    return api.post(PUNCTE_COLECTARE_URL, punctData);
  },

  /**
   * Actualizează un punct de colectare existent
   * @param id ID-ul punctului de colectare
   * @param punctData Date pentru actualizare
   */
  updatePunctColectare: (
    id: number,
    punctData: UpdatePunctColectareDto,
  ): Promise<PunctColectare> => {
    return api.put(`${PUNCTE_COLECTARE_URL}/${id}`, punctData);
  },

  /**
   * Șterge un punct de colectare
   * @param id ID-ul punctului de colectare
   */
  deletePunctColectare: (id: number): Promise<void> => {
    return api.del(`${PUNCTE_COLECTARE_URL}/${id}`);
  },

  /**
   * Obține toate tipurile de client
   */
  getTipuriClient: (): Promise<TipClient[]> => {
    return api.get(TIP_CLIENT_URL);
  },

  /**
   * Obține un tip de client după ID
   * @param id ID-ul tipului de client
   */
  getTipClientById: (id: number): Promise<TipClient> => {
    return api.get(`${TIP_CLIENT_URL}/${id}`);
  },
};

export default clientService;
