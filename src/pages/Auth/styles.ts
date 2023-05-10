import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.main};
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background.light};
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 18px 0px;
`;

export const Form = styled.form`
  gap: 10px;
  min-width: 250px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
