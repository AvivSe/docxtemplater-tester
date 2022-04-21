import DropZoneArea from './DropZoneArea';
import styled from 'styled-components';
import { ProvideUseFiles } from '../hooks/useFiles';
import List from './List';

const Container = styled.div`
  width: 80vw;
`;

function App() {
  return (
    <Container>
      <ProvideUseFiles>
        <DropZoneArea />
        <List />
      </ProvideUseFiles>
    </Container>
  );
}

export default App;
