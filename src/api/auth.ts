import { API_BASE_URL } from '../constants';

export interface Group {
  id: number,
  name: string,
}

export interface Project {
  id: number,
  nombre: string,
  grupos: Group[];
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  proyectos: Project[];
}

export const loginApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/login/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json()
  },
  getUserDetails: async (userId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/api/usuarios/${userId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json()
  }
}
// close
// open
// working

// bajo
// medio
// alto

// * lista de mensajes en tickets
// * asignar ticket si es staff en detalles de ticket
// * manejar status y prioridad de ticket si es staff
// * listar staff en creacion de ticket
// * pagination
// * mostrar todos los proyectos y grupos en los filtros si es staff  http://darkn.duckdns.org:8000/api/proyectos/

// http://darkn.duckdns.org:8000/api/usuarios/?staff=bool true staff false clients

/*
crear y asignar status en creacion de ticket
anhadir status en respuesta del detalle de ticket (id y status), y lista de tickets(status)
endpoint para lista de staff y no-staff
*/