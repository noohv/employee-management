import React from "react";
import { FormControl, Box, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';

export default function ShiftSelect({ shifts, day, shift, handleChange }) {
  return (
    <FormControl>
      <Select
        id="multiple-chip"
        onChange={(e) => handleChange(e, day)}
        multiple
        value={shift[day]}
        input={<OutlinedInput id="select-multiple-chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {shifts?.morning && <MenuItem
          key={"morning"}
          value={"Rīta"}
          >
          Rīta    
        </MenuItem>}
        {shifts?.evening && <MenuItem
          key={"evening"}
          value={"Vakara"}                                      
        >
          Vakara
        </MenuItem>}
        {shifts?.night && <MenuItem
          key={"night"}
          value={"Nakts"}                                      
        > 
          Nakts
        </MenuItem>}
      </Select>
    </FormControl>
  )
}
