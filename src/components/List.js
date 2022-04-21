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
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton } from '@mui/material';

const Container = styled.div`
  margin-top: 1rem;
`;
function List() {
  const files = useFiles();
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openedRow, setOpenedRow] = useState(null);

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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checked.map((file, i) => {
                const error = file.error?.properties?.errors?.[0]?.properties;

                return (
                  <>
                    <TableRow
                      key={file.path}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align={'center'}>
                        {file.error ? (
                          <ReportRoundedIcon style={{ fill: 'red' }} />
                        ) : (
                          <CheckCircleIcon style={{ fill: 'green' }} />
                        )}
                      </TableCell>

                      <TableCell size={'medium'}>{file.path}</TableCell>

                      <TableCell>{error?.explanation}</TableCell>
                      <TableCell>{error?.context}</TableCell>
                      <TableCell>
                        {!!file.error && (
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() =>
                              setOpenedRow((prev) => (prev === i ? null : i))
                            }
                          >
                            {openedRow === i ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={5}
                      >
                        <Collapse
                          in={openedRow === i}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box padding={5}>{JSON.stringify(error)}</Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
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
