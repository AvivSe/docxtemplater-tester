import useFiles from '../hooks/useFiles';
import { useEffect, useState } from 'react';
import testTemplate from '../utils/doxtemplater-tester';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

const Container = styled.div`
  margin-top: 1rem;
`;
function List() {
  const files = useFiles();
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function test() {
      await Promise.all(
        files.list.map(async (file) => {
          try {
            setLoading(true);
            await testTemplate(file);
            file.error = undefined;
          } catch (e) {
            file.error = e;
          } finally {
            setLoading(false);
          }
        })
      );
      setChecked(files.list);
    }
    test();
  }, [files.list]);

  if (loading) {
    return 'Loading...';
  }

  return (
    <Container>
      {!!checked.length && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell size={'medium'}>Template Name</TableCell>
                <TableCell>Explain</TableCell>
                <TableCell>Context</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checked.map((file) => {
                const error = file.error?.properties?.errors?.[0]?.properties;

                return (
                  <TableRow
                    key={file.path}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align={'center'} title={JSON.stringify(error)}>
                      {file.error ? (
                        <ReportRoundedIcon style={{ fill: 'red' }} />
                      ) : (
                        <CheckCircleIcon style={{ fill: 'green' }} />
                      )}
                    </TableCell>

                    <TableCell size={'medium'}>{file.path}</TableCell>

                    <TableCell>{error?.explanation}</TableCell>
                    <TableCell>{error?.context}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default List;
