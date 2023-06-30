'use client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface EndpointInputProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function EndpointInput({
  value,
  onChange,
}: EndpointInputProps): JSX.Element {
  return (
    <Box sx={{ w: '100vw' }}>
      <TextField
        id='endpoint'
        placeholder='GraphQL endpoint'
        value={value}
        onChange={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => onChange(event.target.value)}
        sx={{ minWidth: '94vw', fontSize: '14', padding: '0' }}
      />
    </Box>
  );
}
