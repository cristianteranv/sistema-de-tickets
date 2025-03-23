import { API_BASE_URL } from "../constants"

export const getNames= {
  getUsernameById: async (userId: number)=>{
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
      throw new Error('Error getting tickets by user id')
    }
    return response.json();
  },


  getGroupNameById: async (groupId: number)=>{
    const response = await fetch(
      `${API_BASE_URL}/api/grupos/${groupId}`,
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
  

  getProjectNameById: async (projectId: number)=>{
    const response = await fetch(
      `${API_BASE_URL}/api/proyectos/${projectId}`,
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
}