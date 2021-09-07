import React from 'react';
import Icon from '@chakra-ui/icon';
import { Box, Link } from '@chakra-ui/layout';
import { GoMarkGithub } from 'react-icons/go';

const GitHubProjectLink = (): JSX.Element => {
  return (
    <Box
      position='fixed'
      bottom='1rem'
      right='1rem'
    >
      <Link href="https://github.com/poad/graphql-web-client" isExternal>
        <Icon as={GoMarkGithub}  w='3rem' h='3rem' />
      </Link>
    </Box>
  );
};

export default GitHubProjectLink;