import { useState, useMemo } from "react";
import mockTickets, { Ticket } from "../assets/mockTickets";

export type FilterKeys = "status" | "priority" | "userGroup" | "project";

export default function useTickets(currentUser: string) {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    userGroup: "",
    project: "",
  });

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesUser =
        ticket.creator === currentUser || ticket.assignee === currentUser;

      const searchMatch = Object.values(ticket).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filterMatch = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        // For status and priority, do exact match
        if (key === "status" || key === "priority") {
          return ticket[key as keyof Ticket] === value;
        }
        
        // For other fields, do case-insensitive includes match
        return String(ticket[key as keyof Ticket])
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });

      return matchesUser && (searchMatch || searchQuery === "") && filterMatch;
    });
  }, [tickets, searchQuery, filters, currentUser]);

  const uniqueValues = useMemo(
    () => ({
      statuses: Array.from(new Set(tickets.map((t) => t.status))),
      priorities: Array.from(new Set(tickets.map((t) => t.priority))),
      userGroups: Array.from(new Set(tickets.map((t) => t.userGroup))),
      projects: Array.from(new Set(tickets.map((t) => t.project))),
    }),
    [tickets]
  );

  const handleFilterChange = (field: FilterKeys, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const createTicket = (ticketData: Omit<Ticket, "id" | "status" | "createdAt" | "updatedAt">) => {
    const newTicket: Ticket = {
      id: String(Math.floor(Math.random() * 10000)),
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...ticketData,
    };
    setTickets((prev) => [...prev, newTicket]);
    return newTicket;
  };

  return {
    tickets,
    filteredTickets,
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    uniqueValues,
    createTicket,
  };
} 