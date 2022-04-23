import DropZoneArea from './DropZoneArea';
import styled from 'styled-components';
import List from './List';
import RejectedFiles from './RejectedFiles';
import LinearProgress from '@mui/material/LinearProgress';
import useFiles from '../hooks/useFiles';

const Container = styled.div`
  width: 100%;
`;

function App() {
  const { list, testing } = useFiles();

  return (
    <Container>
      <DropZoneArea />
      <LinearProgress
        style={{ visibility: testing ? 'visible' : 'hidden' }}
        color={'secondary'}
      />
      {!!list.length && <List />}
      <RejectedFiles />
    </Container>
  );
}

export default App;
