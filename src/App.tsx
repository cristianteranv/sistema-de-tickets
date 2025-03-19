import React, { useState } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import { Ticket } from "./assets/mockTickets";
import TicketTable from "./components/TicketTable";
import TicketFilters from "./components/TicketFilters";
import TicketDetailModal from "./components/TicketDetailModal";
import CreateTicketModal from "./components/CreateTicketModal";
import useTickets from "./hooks/useTickets";

const App: React.FC = () => {
  const currentUser = "john.doe@example.com";
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const {
    filteredTickets,
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    uniqueValues,
    createTicket,
  } = useTickets(currentUser);

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
        tickets={filteredTickets} 
        onSelectTicket={setSelectedTicket}
      />
      
      {/* Modals */}
      <TicketDetailModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
      
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTicket={createTicket}
        currentUser={currentUser}
      />
    </Container>
  );
};

export default App;