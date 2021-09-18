import { Input } from '@chakra-ui/input';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button } from '@chakra-ui/react';
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/table';
import React, { ReactElement, useState } from 'react';

interface HeadersProps {
  accordionBgColor: string,
  thBgColor: string,
  onChange: (headers: { [key: string]: string }) => void
}

interface HttpHeaderRecord extends Record<string, unknown> {
  id: string,
  key: {
    id: string,
    value: string,
    readonly?: boolean,
  },
  value: {
    id: string,
    type?: string,
    value: string,
    readonly?: boolean,
    placeholder?: string
  },
}

interface HeadersTableProps {
  thBgColor: string,
  records: HttpHeaderRecord[],
  onChange: (records: HttpHeaderRecord[]) => void
  onDelete: (id: string) => void
}

const HeadersTable = (props: HeadersTableProps): ReactElement => {
  const records = props.records;

  const onKeyChange = (
    { id, value }: {
      id: string,
      value: string
    },
  ) => {
    const index = records.findIndex(record => record.id === id);
    if (index === -1) {
      // skip
      return;
    }

    const oldRecord = records[index];
    const newRecord = {
      id: oldRecord.id,
      key: {
        id: oldRecord.key.id,
        value,
        readonly: oldRecord.key.readonly,
      },
      value: oldRecord.value,
    };

    props.onChange(
      (records.length === 1 ? [] : records.slice(0, index))
        .concat(newRecord, records.length > index + 1 ? records.slice(index + 1) : []));
  };

  const onValueChange = (
    { id, value }: {
      id: string,
      value: string
    },
  ) => {
    const index = records.findIndex(record => record.id === id);
    if (index === -1) {
      // skip
      return;
    }

    const oldRecord = records[index];
    const newRecord = {
      id: oldRecord.id,
      key: oldRecord.key,
      value: {
        id: oldRecord.value.id,
        type: oldRecord.value.type,
        value,
        readonly: oldRecord.value.readonly,
        placeholder: oldRecord.value.placeholder,
      },
    };

    props.onChange(
      (records.length === 1 ? [] : records.slice(0, index))
        .concat(newRecord, records.length > index + 1 ? records.slice(index + 1) : []));
  };

  return (
    <>
      <Table variant='simple'>
        <Thead w='100%'>
          <Tr bgColor={props.thBgColor}>
            <Th w='35%' pl='1rem' pr='1rem'>Name</Th>
            <Th w='65%' pl='1rem' pr='0' colSpan={2}>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => {
            return (
              <Tr key={record.id}>
                <Td key={record.key.id} w='35%' border='none' pl='0' pr='1rem' pt='0.5rem'>
                  <Input
                    type='text'
                    name={record.key.id}
                    readOnly={record.key.readonly}
                    value={record.key.value}
                    onChange={(event) => onKeyChange({ id: record.id, value: event.target.value })}
                  />
                </Td>
                <Td key={record.value.id} w='64%' border='none' pl='0' pr='1rem' pt='0.5rem'>
                  <Input
                    type={record.value.type || 'text'}
                    name={record.value.id}
                    readOnly={record.value.readonly}
                    placeholder={record.value.placeholder}
                    value={record.value.value}
                    onChange={(event) => onValueChange({ id: record.id, value: event.target.value })}
                  />
                </Td>
                <Td w='1%' border='none' pl='0' pr='0' pt='0.5rem'>
                  <Button onClick={() => props.onDelete(record.id)}>-</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

const Headers = (props: HeadersProps): JSX.Element => {

  const originalData = [{
    id: 'header-0',
    key: {
      id: 'header-0-key',
      value: 'Authorization',
      readonly: true,
    },
    value: {
      id: 'header-0-value',
      value: '',
      type: 'password',
      placeholder: 'ex) Bearer <YOUR_TOKEN>',
    },
  }];
  const [data, setData] = useState<HttpHeaderRecord[]>(originalData);

  const groupBy = <K extends PropertyKey, V>(
    array: readonly V[],
    getKey: (cur: V, idx: number, src: readonly V[]) => K,
  ) =>
    array.reduce((obj, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const record = (obj[key] || (obj[key] = []));
      if (record === undefined) {
        throw new Error(`${key} in ${obj} is undefined`);
      }
      record.push(cur);
      return obj;
    }, {} as Partial<Record<K, V[]>>);

  const updateData = (headers: HttpHeaderRecord[]) => {
    setData(headers);

    const groupping = groupBy(
      headers.map(header => ({ key: header.key.value, value: header.value.value })),
      r => r.key,
    );

    const h = Object.keys(groupping).map(key => ({
      key,
      value: groupping[key]?.map(r => r.value).reduce((acc, cur) => acc.concat(',', cur)),
    }))
      .filter(r => r.value !== undefined)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .filter(r => (r.key === 'Authorization' && r.value!.length > 0) || r.key !== 'Authorization')
      .map((entry) => {
        const entity: { [key: string]: string } = {};
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        entity[entry.key] = entry.value!;
        return entity;
      });

    props.onChange(h.length > 0 ? h.reduce((cur, acc) => Object.assign(acc, cur)) : {});
  };

  const resetData = () => updateData(originalData);

  const addData = () => updateData(data.concat([{
    id: `header-${data.length}`,
    key: {
      id: `header-${data.length}-key`,
      value: '',
    },
    value: {
      id: `header-${data.length}-value`,
      value: '',
    },
  }]));

  const remove = (id: string): void => {
    const index = data.findIndex(record => record.id === id);
    if (index === -1) {
      return;
    }

    updateData(data.slice(0, index).concat(data.length > 1 ? data.slice(index + 1) : []));
  };

  return (
    <Box pb='0'>
      <Accordion allowToggle>
        <AccordionItem border='none' pb='0'>
          <AccordionButton bg={props.accordionBgColor}>
            <Box flex='1' textAlign='left'>
              <h2>
                Headers
              </h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            pl='0'
            pr='0'
            pb='0'
          >
            <HeadersTable
              records={data}
              {...props}
              onChange={updateData}
              onDelete={remove}
            />
            <Button onClick={addData}>+</Button>
            <Button onClick={resetData} ml={'1rem'}>Reset</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Headers;
