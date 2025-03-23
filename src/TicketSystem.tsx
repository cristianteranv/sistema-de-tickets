import React, { useState } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import TicketTable from "./components/tickets/TicketTable";
import TicketFilters from "./components/tickets/TicketFilters";
import TicketDetailModal from "./components/tickets/TicketDetailModal";
import CreateTicketModal from "./components/tickets/CreateTicketModal";
import useTickets from "./hooks/useTickets";
import { useAuth } from "./contexts/AuthContext";
import { Ticket } from './api/tickets';


const TicketSystem: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { logout } = useAuth();

  const {
    tickets,
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    uniqueValues,
    refreshTickets
  } = useTickets();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }}
      >
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          mb: { xs: 2, sm: 0 }
        }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Tickets
            </Typography>
          </Box>
          
          <Box sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsCreateModalOpen(true)}
              sx={{ 
                minWidth: 150,
                borderRadius: 2,
                mt: { xs: 2, sm: 0 }
              }}
            >
              Create Ticket
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={logout}
              sx={{ 
                minWidth: 150,
                borderRadius: 2,
                mt: { xs: 2, sm: 0 }
              }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Filters */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <TicketFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          uniqueValues={uniqueValues}
          handleFilterChange={handleFilterChange}
        />
      </Paper>
      
      {/* Ticket table */}
      <TicketTable 
        tickets={tickets} 
        onSelectTicket={setSelectedTicket}
      />
      
      {/* Modals */}
      <TicketDetailModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
      
      <CreateTicketModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        proyectos={uniqueValues.proyectos}
        grupos={uniqueValues.grupos}
        onTicketCreated={refreshTickets}
      />
    </Container>
  );
};

export default TicketSystem;