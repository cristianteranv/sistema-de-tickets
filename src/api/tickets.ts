import { API_BASE_URL } from "../constants"

export interface Ticket {
  id: number,
  asunto: string,
  prioridad: number,
  visible: boolean,
  auth_user: number, //userid
  auth_user_nombre: string,
  auth_user_atendiendo: number | null,
  auth_user_atendiendo_nombre: string,
  proyecto: number, //projectid
  proyecto_nombre: string,
  grupo: number, //groupid
  grupo_nombre: string,
  created_at: string,
  updated_at: string,
  mensajes: Mensaje[], //mensaje
}

export interface Mensaje {
  auth_user: number,
  contenido: string,
  visible: boolean,
  id: number,
  is_media: boolean,
  ticket: number,
  created_at: string,
  updated_at: string
}

export interface CreateTicketForm extends Omit<Ticket, 
  'id' |
  'mensajes' | 
  'grupo_nombre' | 
  'proyecto_nombre' | 
  'auth_user_nombre' | 
  'auth_user_atendiendo_nombre' | 
  'created_at' | 
  'updated_at'> {
  nuevo_mensaje: string
}

export interface TicketWithDetails extends Ticket {
  auth_user_name: string,
  auth_user_atendiendo_name: string,
  grupo_name: string,
  proyecto_name: string,
}

export const ticket_api = {
  getTicketsByUserId: async (userId: number, queryParams: URLSearchParams) => {
    const response = await fetch(
      `${API_BASE_URL}/api/ticketsUser/${userId}/?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    if (!response.ok) {
      throw new Error('Error getting tickets by user id')
    }
    return response.json()
  },

  getTicketDetails: async (ticketId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/api/tickets/${ticketId}/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    if (!response.ok) {
      throw new Error('Error getting ticket details')
    }
    return response.json()
  },

  createTicket: async (ticketInfo: CreateTicketForm) => {
    console.log('ticket info', ticketInfo);
    const response = await fetch(
      `${API_BASE_URL}/api/tickets/`,
      {
        method: 'POST',
        body: JSON.stringify(ticketInfo),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    if (!response.ok) {
      throw new Error('Error creating new ticket')
    }
    return response.json()
  },

  searchTickets: ()=>{},
}