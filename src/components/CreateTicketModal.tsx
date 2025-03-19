import React, { useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Ticket } from "../assets/mockTickets";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTicket: (ticketData: Omit<Ticket, "id" | "status" | "createdAt" | "updatedAt">) => void;
  currentUser: string;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  onCreateTicket,
  currentUser,
}) => {
  const handleCreateTicket = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const ticketData = {
        title: formData.get("title") as string,
        creator: currentUser,
        assignee: formData.get("assignee") as string,
        priority: formData.get("priority") as "low" | "medium" | "high" | "critical",
        userGroup: formData.get("userGroup") as string,
        project: formData.get("project") as string,
        description: formData.get("description") as string,
      };
      onCreateTicket(ticketData);
      onClose();
    },
    [currentUser, onCreateTicket, onClose]
  );

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Create New Ticket
        </Typography>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 3 }}>
        <form id="create-ticket-form" onSubmit={handleCreateTicket}>
          <Grid container spacing={3}>
            {/* Ticket title */}
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Ticket Title"
                placeholder="Enter a descriptive title"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            
            {/* First row */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="assignee"
                label="Assignee"
                placeholder="Email address"
                fullWidth
                required
                variant="outlined"
                helperText="Person responsible for this ticket"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  name="priority"
                  label="Priority"
                  defaultValue=""
                >
                  <MenuItem value="" disabled>Select Priority</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
                <FormHelperText>Impact level of this issue</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="userGroup"
                label="User Group"
                placeholder="Team or department"
                fullWidth
                required
                variant="outlined"
                helperText="Team responsible for this ticket"
              />
            </Grid>
            
            {/* Project */}
            <Grid item xs={12}>
              <TextField
                name="project"
                label="Project"
                placeholder="Project name"
                fullWidth
                required
                variant="outlined"
                helperText="Project this ticket belongs to"
              />
            </Grid>
            
            {/* Description */}
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                placeholder="Detailed description of the issue or request"
                multiline
                rows={5}
                fullWidth
                required
                variant="outlined"
                helperText="Provide all relevant details for this ticket"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          color="inherit"
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          form="create-ticket-form"
          variant="contained" 
          color="primary"
        >
          Create Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTicketModal; 