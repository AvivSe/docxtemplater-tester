import DropZoneArea from './DropZoneArea';
import styled from 'styled-components';
import { ProvideUseFiles } from '../hooks/useFiles';
import List from './List';
import RejectedFiles from './RejectedFiles';

const Container = styled.div`
  width: 80vw;
`;

function App() {
  return (
    <Container>
      <ProvideUseFiles>
        <DropZoneArea />
        <List />
        <RejectedFiles />
      </ProvideUseFiles>
    </Container>
  );
}

export default App;
