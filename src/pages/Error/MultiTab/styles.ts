import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: auto;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.main};
  background-color: ${({ theme }) => theme.colors.background.main};

  & > div {
    display: flex;
    width: 300px;
    padding: 20px;
    border-radius: 20px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 18px 0px;
    background-color: ${({ theme }) => theme.colors.background.light};
  }

  .actions {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    button {
      width: 125px;

      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
`;
