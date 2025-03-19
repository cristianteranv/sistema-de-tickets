import React from "react";
import { 
  TextField, 
  Select, 
  MenuItem,
  FormControl, 
  InputLabel, 
  Stack,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { FilterKeys } from "../hooks/useTickets";

interface TicketFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    status: string;
    priority: string;
    userGroup: string;
    project: string;
  };
  uniqueValues: {
    statuses: string[];
    priorities: string[];
    userGroups: string[];
    projects: string[];
  };
  handleFilterChange: (field: FilterKeys, value: string) => void;
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

const TicketFilters: React.FC<TicketFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  uniqueValues,
  handleFilterChange,
}) => {
  // Render colored option for status and priority
  const renderColoredOption = (option: string, type: "status" | "priority") => {
    const colorMap = type === "status" ? statusColors : priorityColors;
    return (
      <MenuItem key={option} value={option} sx={{ my: 0.5 }}>
        <Chip 
          label={option} 
          size="small"
          sx={{ 
            backgroundColor: colorMap[option] || "#757575",
            color: "white",
            fontWeight: "bold",
            mr: 1
          }}
        />
      </MenuItem>
    );
  };

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
        {Object.entries(uniqueValues).map(([key, options]) => {
          // Convert the key from plural to singular and as a FilterKeys type
          const filterKey = key.replace('statuses', 'status').replace('priorities', 'priority') as FilterKeys;
          const label = key.charAt(0).toUpperCase() + key.slice(1);

          return (
            <FormControl 
              key={key} 
              sx={{ 
                minWidth: 150,
                width: { xs: "100%", sm: "auto" }
              }}
              size="small"
            >
              <InputLabel id={`${key}-label`}>{label}</InputLabel>
              <Select
                labelId={`${key}-label`}
                value={filters[filterKey] || ""}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                input={<OutlinedInput label={label} />}
              >
                <MenuItem value="">
                  All {label}
                </MenuItem>
                {options.map((option) => 
                  filterKey === "status" || filterKey === "priority"
                    ? renderColoredOption(option, filterKey as "status" | "priority")
                    : (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default TicketFilters; 