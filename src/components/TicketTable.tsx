import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { Ticket } from "../assets/mockTickets";

interface TicketTableProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

// Color mapping for statuses and priorities
const statusColors: Record<string, string> = {
  "open": "#ff9800", // orange 
  "in-progress": "#2196f3", // Blue 
  "resolved": "#4caf50", //  green
  "closed": "#979dac", // gray
};

const priorityColors: Record<string, string> = {
  "low": "#4caf50", //  Green
  "medium": "#ff9800", // orange
  "high": "#f44336", // red
  "critical": "#000000", // black
};

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onSelectTicket }) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No tickets found matching your criteria
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                sx={{ 
                  cursor: "pointer", 
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  transition: "background-color 0.2s ease"
                }}
              >
                <TableCell>{ticket.id}</TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {ticket.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {ticket.project}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={ticket.status} 
                    size="small" 
                    sx={{ 
                      backgroundColor: statusColors[ticket.status] || '#757575',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={ticket.priority} 
                    size="small" 
                    sx={{ 
                      backgroundColor: priorityColors[ticket.priority] || '#757575',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }} 
                  />
                </TableCell>
                <TableCell>{ticket.assignee}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2">
                      {new Date(ticket.updatedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(ticket.updatedAt).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable; 