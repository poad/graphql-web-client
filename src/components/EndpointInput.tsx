import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface EndpointInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const EndpointInput = ({ value, onChange, onSelect }: EndpointInputProps): JSX.Element => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onSelect(event.target.value);
  };

  return (
    <Box sx={{ w: '100vw' }}>
      <TextField
        id='endpoint'
        placeholder='GraphQL endpoint'
        value={value}
        onChange={handleInputChange}
        sx={{ minWidth: '94vw', fontSize: '14', padding: '0' }}
      />
      <Select
        placeholder='HTTP Method'
        defaultValue='POST'
        onChange={handleSelectChange}
        sx={{ minWidth: '6vw', fontSize: '14', padding: '0' }}
      >
        <option value='POST'>POST</option>
        <option value='GET'>GET</option>
      </Select>
    </Box>
  );
};

export default EndpointInput;
