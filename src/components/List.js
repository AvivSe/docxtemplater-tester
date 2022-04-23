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
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 80vw;
  @media (max-width: 1440px) {
    width: 95vw;
  }
`;
function List() {
  const files = useFiles();

  return (
    <Container>
      {!!files.tested.length && (
        <Wrapper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 10 }} size={'small'}></TableCell>
                  <TableCell size={'medium'}>Template Name</TableCell>
                  <TableCell>Explain</TableCell>
                  <TableCell>Context</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.tested.map((file) => {
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
        </Wrapper>
      )}
    </Container>
  );
}

export default List;
