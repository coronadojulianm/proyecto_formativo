import styled from "styled-components";


export function ReportesTemplate() {
  return (
    <Container>
      <h1>Reportes Template Hola desde Reportes</h1>
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