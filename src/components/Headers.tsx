import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactElement, useState } from 'react';

interface HeadersProps {
  accordionBgColor?: string;
  thBgColor?: string;
  onChange: (headers: { [key: string]: string }) => void;
}

interface HttpHeaderRecord extends Record<string, unknown> {
  id: string;
  key: {
    id: string;
    value: string;
    readonly?: boolean;
  };
  value: {
    id: string;
    type?: string;
    value: string;
    readonly?: boolean;
    placeholder?: string;
  };
}

interface HeadersTableProps {
  thBgColor?: string;
  records: HttpHeaderRecord[];
  onChange: (records: HttpHeaderRecord[]) => void;
  onDelete: (id: string) => void;
}

const HeadersTable = (props: HeadersTableProps): ReactElement => {
  const records = props.records;

  const onKeyChange = ({
    id,
    value,
  }: {
    id: string;
    value: string;
  }) => {
    const index = records.findIndex((record) => record.id === id);
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
      (records.length === 1 ? [] : records.slice(0, index)).concat(
        newRecord,
        records.length > index + 1 ? records.slice(index + 1) : [],
      ),
    );
  };

  const onValueChange = ({
    id,
    value,
  }: {
    id: string;
    value: string;
  }) => {
    const index = records.findIndex((record) => record.id === id);
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
      (records.length === 1 ? [] : records.slice(0, index)).concat(
        newRecord,
        records.length > index + 1 ? records.slice(index + 1) : [],
      ),
    );
  };

  return (
    <>
      <Table
        sx={{
          pt: '0',
          pb: '0',
          mt: '0',
        }}
      >
        <TableHead sx={{ w: '100vw' }}>
          <TableRow sx={{ bgcolor: 'background.paper' }}>
            <TableCell
              component='th'
              sx={{
                w: '35vw',
                pl: '1rem',
                pr: '1rem',
              }}
            >
              Name
            </TableCell>
            <TableCell
              component='th'
              sx={{
                w: '65vw',
                pl: '1rem',
                pr: '0',
              }}
              colSpan={2}
            >
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => {
            return (
              <TableRow key={record.id}>
                <TableCell
                  key={record.key.id}
                  sx={{
                    w: '35vw',
                    border: 'none',
                    pl: '0',
                    pr: '1rem',
                    pt: '0.5rem',
                  }}
                >
                  <TextField
                    type='text'
                    name={record.key.id}
                    InputProps={{
                      readOnly: record.value.readonly,
                    }}
                    value={record.key.value}
                    onChange={(event) =>
                      onKeyChange({ id: record.id, value: event.target.value })
                    }
                    sx={{ minWidth: '100%', bgcolor: 'background.default' }}
                  />
                </TableCell>
                <TableCell
                  key={record.value.id}
                  sx={{
                    w: '64vw',
                    border: 'none',
                    pl: '0',
                    pr: '0',
                    pt: '0.5rem',
                  }}
                >
                  <TextField
                    type={record.value.type || 'text'}
                    name={record.value.id}
                    InputProps={{
                      readOnly: record.value.readonly,
                    }}
                    placeholder={record.value.placeholder}
                    value={record.value.value}
                    onChange={(event) =>
                      onValueChange({
                        id: record.id,
                        value: event.target.value,
                      })
                    }
                    sx={{ minWidth: '100%', bgcolor: 'background.default' }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: '1vw',
                    p: '0',
                    m: '0',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    onClick={() => props.onDelete(record.id)}
                    sx={{
                      fontSize: '1.75rem',
                      minWidth: '1vw',
                      p: '0',
                      m: '0',
                      color: 'text.primary',
                    }}
                  >
                    -
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

const Headers = (props: HeadersProps): JSX.Element => {
  const originalData = [
    {
      id: 'header-0',
      key: {
        id: 'header-0-key',
        value: 'Authorization',
        readonly: true,
      },
      value: {
        id: 'header-0-value',
        value: '',
        type: 'text',
        placeholder: 'ex) Bearer <YOUR_TOKEN>',
      },
    },
  ];
  const [data, seTableCellata] = useState<HttpHeaderRecord[]>(originalData);

  const groupBy = <K extends PropertyKey, V>(
    array: readonly V[],
    getKey: (cur: V, idx: number, src: readonly V[]) => K,
  ) =>
    array.reduce((obj, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const record = obj[key] || (obj[key] = []);
      if (!record) {
        throw new Error(`${key.toString()} in ${obj} is undefined`);
      }
      record.push(cur);
      return obj;
    }, {} as Partial<Record<K, V[]>>);

  const updateData = (headers: HttpHeaderRecord[]) => {
    seTableCellata(headers);

    const groupping = groupBy(
      headers.map((header) => ({
        key: header.key.value,
        value: header.value.value,
      })),
      (r) => r.key,
    );

    const h = Object.keys(groupping)
      .map((key) => ({
        key,
        value: groupping[key]
          ?.map((r) => r.value)
          .reduce((acc, cur) => acc.concat(',', cur)),
      }))
      .filter((r) => r.value !== undefined)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .filter(
        (r) =>
          (r.key === 'Authorization' && r.value && r.value.length > 0) ||
          r.key !== 'Authorization',
      )
      .map((entry) => {
        const entity: { [key: string]: string } = {};
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // rome-ignore lint/style/noNonNullAssertion: <explanation>
        entity[entry.key] = entry.value!;
        return entity;
      });

    props.onChange(
      h.length > 0 ? h.reduce((cur, acc) => Object.assign(acc, cur)) : {},
    );
  };

  const reseTableCellata = () => updateData(originalData);

  const addData = () =>
    updateData(
      data.concat([
        {
          id: `header-${data.length}`,
          key: {
            id: `header-${data.length}-key`,
            value: '',
          },
          value: {
            id: `header-${data.length}-value`,
            value: '',
          },
        },
      ]),
    );

  const remove = (id: string): void => {
    const index = data.findIndex((record) => record.id === id);
    if (index === -1) {
      return;
    }

    updateData(
      data.slice(0, index).concat(data.length > 1 ? data.slice(index + 1) : []),
    );
  };

  return (
    <Box pb='0'>
      <Accordion
        sx={{ border: 'none', pt: '0', pl: '0', pr: '0', bgcolor: 'divider' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ margin: '0', pt: '0', pb: '0', fontSize: '14' }}
        >
          Headers
        </AccordionSummary>
        <AccordionDetails
          sx={{
            pt: '0',
            mt: '0',
          }}
        >
          <HeadersTable
            records={data}
            {...props}
            onChange={updateData}
            onDelete={remove}
          />
          <Button onClick={addData} sx={{ color: 'text.primary' }}>
            +
          </Button>
          <Button
            onClick={reseTableCellata}
            sx={{ ml: '1rem', color: 'text.primary' }}
          >
            Reset
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Headers;
