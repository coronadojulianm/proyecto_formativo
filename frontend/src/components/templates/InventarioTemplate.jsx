import styled from "styled-components";


export function InventarioTemplate() {
  return (
    <Container>
      <h1>Inventario Template Hola desde Inventario</h1>
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