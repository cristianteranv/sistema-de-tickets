import { useState, useEffect, useCallback } from "react";
import { Ticket, ticket_api } from "../api/tickets";
import { useAuth } from "../contexts/AuthContext";
import { Group } from "../api/auth";

export type FilterKeys = "prioridad" | "grupo" | "proyecto";

interface Filters {
  prioridad: number | null;
  grupo: number | null;
  proyecto: number | null;
}

export default function useTickets() {
  const { userId, projects } = useAuth();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    prioridad: null,
    grupo: null,
    proyecto: null,
  });
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
  });

  const [availableGroups, setAvailableGroups] = useState<{id: number; name: string}[]>([]);

  if (!userId) {
    throw Error("UserId error");
  }

  useEffect(() => {
    if (!filters.proyecto) {
      // If no project selected, show all groups from all projects
      const allGroups = projects.flatMap(project => 
        project.grupos.map(group => ({
          id: group.id,
          name: group.name
        }))
      );
      
      // Remove duplicates (if any group appears in multiple projects)
      const uniqueGroups = Array.from(
        new Map(allGroups.map(item => [item.id, item])).values()
      );
      
      setAvailableGroups(uniqueGroups);
    } else {
      // If project selected, show only groups from that project
      const selectedProject = projects.find(p => p.id === filters.proyecto);
      if (selectedProject) {
        const projectGroups = selectedProject.grupos.map(group => ({
          id: group.id,
          name: group.name
        }));
        setAvailableGroups(projectGroups);
        
        // If current group is not in this project, reset it
        if (filters.grupo && !projectGroups.some(g => g.id === filters.grupo)) {
          setFilters(prev => ({ ...prev, grupo: null }));
        }
      }
    }
  }, [filters, projects]);

  const fetchTickets = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", pagination.limit.toString());
    queryParams.append("offset", pagination.offset.toString());
    
    if (searchQuery) {
      queryParams.append("asunto", searchQuery);
    }
    
    if (filters.prioridad) queryParams.append("prioridad", filters.prioridad.toString());
    if (filters.grupo) queryParams.append("grupo", filters.grupo.toString());
    if (filters.proyecto) queryParams.append("proyecto", filters.proyecto.toString());

    const data = await ticket_api.getTicketsByUserId(userId, queryParams);
    setTickets(data.results as Ticket[]);
  }, [filters, pagination, searchQuery, userId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const priorities = [...new Set(tickets.map(ticket => ticket.prioridad))].sort();

  const handleFilterChange = (field: FilterKeys, value: number | null) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const uniqueValues = {
    prioridades: priorities,
    grupos: availableGroups as Group[],
    proyectos: projects
  };

  const createTicket = () => {
    // ticket_api.createTicket()
  };

  return {
    tickets,
    searchQuery,
    uniqueValues,
    setSearchQuery,
    filters,
    handleFilterChange,
    createTicket,
    setPagination,
    refreshTickets: fetchTickets,
  };
}