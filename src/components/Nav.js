import styled from 'styled-components';
import { Button } from './ui/Button';

const StyledNav = styled.nav`
  margin-top: 0.5rem;
  text-align: end;
  width: 100%;
`;
function Nav() {
  return (
    <StyledNav>
      <Button>Clear</Button>
    </StyledNav>
  );
}

export default Nav;
