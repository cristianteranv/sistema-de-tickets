import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { CreateTicketForm, ticket_api } from '../../api/tickets';
import { Group, Project } from '../../api/auth';

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  proyectos: Project[];
  grupos: Group[];
  onTicketCreated?: () => void; // Optional callback to refresh ticket list
}

// Extend the CreateTicketForm to handle null values for unselected state
interface FormState extends Omit<CreateTicketForm, 'proyecto' | 'grupo'> {
  proyecto: number | null;
  grupo: number | null;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  open,
  onClose,
  proyectos,
  grupos,
  onTicketCreated
}) => {
  const { userId } = useAuth();
  
  const [formData, setFormData] = useState<FormState>({
    asunto: '',
    prioridad: 2,
    visible: true,
    auth_user_atendiendo: null,
    auth_user: userId as number,
    proyecto: null,  // null for unselected state
    grupo: null,     // null for unselected state
    nuevo_mensaje: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback( (field: keyof FormState) => (
    event: SelectChangeEvent<unknown> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> 
  ) => {
    const value = event.target.value;
    
    // Clear validation error when a field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: field === 'visible' 
        ? (event.target as HTMLInputElement).checked 
        : field === 'proyecto' || field === 'grupo'
          ? value === '' ? null : Number(value)
          : value
    }));
  },[validationErrors]);

  

  const handleSubmit = useCallback( async (e: React.FormEvent) => {
    e.preventDefault();
    const validateForm = (): boolean => {
      const errors: Record<string, string> = {};
      
      if (!formData.asunto.trim()) {
        errors.asunto = 'Subject is required';
      }
      
      if (formData.proyecto === null) {
        errors.proyecto = 'Project is required';
      }
      
      if (formData.grupo === null) {
        errors.grupo = 'Group is required';
      }
      
      if (!formData.nuevo_mensaje.trim()) {
        errors.nuevo_mensaje = 'Message is required';
      }
      
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {      
      const ticketData: CreateTicketForm = {
        ...formData,
        proyecto: formData.proyecto as number,
        grupo: formData.grupo as number,
      };
      console.log('ticket creation', ticketData);
      await ticket_api.createTicket(ticketData);
      onTicketCreated?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  },[formData, onClose, onTicketCreated])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Ticket</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Subject"
              fullWidth
              required
              value={formData.asunto}
              onChange={handleChange('asunto')}
              error={!!validationErrors.asunto}
              helperText={validationErrors.asunto}
            />

            <FormControl fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.prioridad}
                onChange={handleChange('prioridad') as (event: SelectChangeEvent<unknown>) => void}
                label="Priority"
              >
                <MenuItem value={1}>Low (1)</MenuItem>
                <MenuItem value={2}>Medium (2)</MenuItem>
                <MenuItem value={3}>High (3)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required error={!!validationErrors.proyecto}>
              <InputLabel>Project</InputLabel>
              <Select
                value={formData.proyecto === null ? '' : formData.proyecto}
                onChange={handleChange('proyecto') as (event: SelectChangeEvent<unknown>) => void}
                label="Project"
              >
                <MenuItem value="">
                  <em>Select a project</em>
                </MenuItem>
                {proyectos.map(proyecto => (
                  <MenuItem key={proyecto.id} value={proyecto.id}>
                    {proyecto.nombre}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.proyecto && (
                <FormHelperText>{validationErrors.proyecto}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth required error={!!validationErrors.grupo}>
              <InputLabel>Group</InputLabel>
              <Select
                value={formData.grupo === null ? '' : formData.grupo}
                onChange={handleChange('grupo') as (event: SelectChangeEvent<unknown>) => void}
                label="Group"
              >
                <MenuItem value="">
                  <em>Select a group</em>
                </MenuItem>
                {grupos.map(grupo => (
                  <MenuItem key={grupo.id} value={grupo.id}>
                    {grupo.name}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.grupo && (
                <FormHelperText>{validationErrors.grupo}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Message"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.nuevo_mensaje}
              onChange={handleChange('nuevo_mensaje')}
              error={!!validationErrors.nuevo_mensaje}
              helperText={validationErrors.nuevo_mensaje}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.visible}
                  onChange={handleChange('visible')}
                />
              }
              label="Visible"
            />

            {error && (
              <div style={{ color: 'red' }}>{error}</div>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
            color="primary"
          >
            {isSubmitting ? 'Creating...' : 'Create Ticket'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateTicketModal;