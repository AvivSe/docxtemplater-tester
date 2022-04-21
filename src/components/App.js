import DropZoneArea from './DropZoneArea';
import styled from 'styled-components';
import { ProvideUseFiles } from '../hooks/useFiles';
import List from './List';
import Nav from './Nav';

const Container = styled.div`
  width: 80vw;
`;

function App() {
  return (
    <Container>
      <ProvideUseFiles>
        <DropZoneArea />
        <Nav />
        <List />
      </ProvideUseFiles>
    </Container>
  );
}

export default App;
