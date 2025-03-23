import React from "react";
import { 
  TextField, 
  Select, 
  MenuItem,
  FormControl, 
  InputLabel, 
  Stack,
} from "@mui/material";
import { FilterKeys } from "../../hooks/useTickets";
import { Group, Project } from "../../api/auth";

interface TicketFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    // status: string;
    prioridad: number | null;
    grupo: number | null;
    proyecto: number | null;
  };
  uniqueValues: {
    // statuses: string[];
    prioridades: number[];
    grupos: Group[],
    proyectos: Project[];
  };
  handleFilterChange: (field: FilterKeys, value: number | null) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  uniqueValues,
  handleFilterChange,
}) => {

  return (
    <Stack 
      direction={{ xs: "column", md: "row" }} 
      spacing={2} 
      alignItems="center" 
      sx={{ width: "100%" }}
    >
      <TextField
        label="Search tickets"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ flexGrow: 1, width: { xs: "100%", md: "auto" } }}
        size="small"
      />
      
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          flexWrap: { xs: "wrap", lg: "nowrap" },
          justifyContent: "flex-start",
          width: { xs: "100%", md: "auto" }
        }}
      >
        {/* Priority Filter */}
        <FormControl 
          sx={{ minWidth: 150, width: { xs: "100%", sm: "auto" } }}
          size="small"
        >
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.prioridad ?? ''}
            onChange={(e) => handleFilterChange(
              'prioridad', 
              e.target.value === '' ? null : Number(e.target.value)
            )}
            label="Priority"
          >
            <MenuItem value="">All Priorities</MenuItem>
            {uniqueValues.prioridades.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Project Filter */}
        <FormControl 
          sx={{ minWidth: 150, width: { xs: "100%", sm: "auto" } }}
          size="small"
        >
          <InputLabel>Project</InputLabel>
          <Select
            value={filters.proyecto ?? ''}
            onChange={(e) => handleFilterChange(
              'proyecto',
              e.target.value === '' ? null : Number(e.target.value)
            )}
            label="Project"
          >
            <MenuItem value="">All Projects</MenuItem>
            {uniqueValues.proyectos.map((project) => {
              console.log('project',project)
            return (
              <MenuItem key={project.id} value={project.id}>
                {project.nombre}
              </MenuItem>
            )})}
          </Select>
        </FormControl>

        {/* Group Filter */}
        <FormControl 
          sx={{ minWidth: 150, width: { xs: "100%", sm: "auto" } }}
          size="small"
        >
          <InputLabel>Group</InputLabel>
          <Select
            value={filters.grupo ?? ''}
            onChange={(e) => handleFilterChange(
              'grupo',
              e.target.value === '' ? null : Number(e.target.value)
            )}
            label="Group"
          >
            <MenuItem value="">All Groups</MenuItem>
            {uniqueValues.grupos.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Stack>
    </Stack>
  );
};

export default TicketFilters; 