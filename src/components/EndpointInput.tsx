import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Spacer, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { HTMLAttributes } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type EndpointInputProps = HTMLAttributes<HTMLDivElement> & {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>,
  btnColor: string;
  isSubmitting: boolean
};

const EndpointInput = (props: EndpointInputProps): JSX.Element => {
  return (
    <Flex w='100%'>
      <FormControl isRequired w='100%' isInvalid={props.errors.endpoint !== undefined}>
        <FormLabel>GraphQL Endpoint</FormLabel>
        <Input
          id='endpoint'
          placeholder='GraphQL endpoint'
          {...props.register('endpoint', {
            required: 'This is required',
            minLength: { value: 8, message: 'Minimum length should be 8' },
          })}
        />
      </FormControl>
      <FormControl isRequired w='10%' isInvalid={props.errors.endpoint !== undefined}>
        <FormLabel>Method</FormLabel>
        <Select placeholder='HTTP Method' defaultValue='POST'>
          <option value='POST'>POST</option>
          <option value='GET'>GET</option>
        </Select>
      </FormControl>
      <VStack w='5%' align='stretch'>
        <Spacer />
        <Button colorScheme={props.btnColor} isLoading={props.isSubmitting} type='submit'>
                    Submit
        </Button>
      </VStack>
    </Flex>
  );
};

export default EndpointInput;
