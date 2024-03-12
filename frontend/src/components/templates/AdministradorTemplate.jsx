import styled from "styled-components";
import { SidebarCard } from "../../../index";


export function AdministradorTemplate() {
  return (
    <Container>
      <h1>Administrador Template Hola desde administrador</h1>
      <>
      <SidebarCard/>
      </>
      
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;