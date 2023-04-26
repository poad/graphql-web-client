import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubProjectLink = (): JSX.Element => {
  return (
    <Box position='fixed' bottom='1rem' right='1rem'>
      <Link href="https://github.com/poad/graphql-web-client">
        <GitHubIcon sx={{ w: '3rem', h: '3rem', color: 'text.primary' }} />
      </Link>
    </Box>
  );
};

export default GitHubProjectLink;
