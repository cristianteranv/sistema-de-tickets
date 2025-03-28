import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Grid,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Ticket } from "../../api/tickets";

interface TicketDetailModalProps {
  ticket: Ticket | null;
  onClose: () => void;
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

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  onClose,
}) => {
  if (!ticket) return null;

  // Format dates for better display
  const createdDate = new Date(ticket.created_at);
  const updatedDate = new Date(ticket.updated_at);

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const created = formatDateTime(createdDate);
  const updated = formatDateTime(updatedDate);

  return (
    <Dialog 
      open={!!ticket} 
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          {ticket.asunto}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Ticket #{ticket.id} 
        </Typography>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pb: 1 }}>
        <Stack spacing={3}>
          {/* Status and priority */}
          <Box>
            <Stack direction="row" spacing={2}>
              <Chip 
                label={'status'} 
                sx={{ 
                  backgroundColor: statusColors['status'],
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}
              />
              
              <Chip 
                label={ticket.prioridad} 
                sx={{ 
                  backgroundColor: priorityColors[ticket.prioridad],
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}
              />
            </Stack>
          </Box>
          
          {/* Main ticket info */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Project
              </Typography>
              <Typography variant="body1">
                {ticket.proyecto_nombre}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                User Group
              </Typography>
              <Typography variant="body1">
                {ticket.grupo_nombre}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Creator
              </Typography>
              <Typography variant="body1">
                {ticket.auth_user_nombre}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Assignee
              </Typography>
              <Typography variant="body1">
                {ticket.auth_user_atendiendo_nombre}
              </Typography>
            </Grid>
          </Grid>
          
          {/* Description */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Description
            </Typography>

            {/* CLEAN UP CLEAN UP CLEAN UP */}
            
            {/* <Typography variant="body1" sx={{ 
              p: 2, 
              backgroundColor: 'rgba(0,0,0,0.04)',
              borderRadius: 1,
              whiteSpace: 'pre-line'
            }}>
              <div>
              {ticket.mensajes.map((mensaje)=><div>{mensaje}</div>)}
              </div>
            </Typography> */}
            
              <div>
              {ticket.mensajes.map((mensaje)=>
              <Typography variant="body1" sx={{ 
                p: 2, 
                backgroundColor: 'rgba(0,0,0,0.04)',
                borderRadius: 1,
                whiteSpace: 'pre-line'
              }}>
                {mensaje.contenido}
                </Typography>)}
              </div>
            
          </Box>
          
          {/* Dates */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body2">
                {created.date}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {created.time}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body2">
                {updated.date}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {updated.time}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          color="primary"
          size="medium"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDetailModal; 