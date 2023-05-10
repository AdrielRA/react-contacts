import styled from "styled-components";

export const Container = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};

  & > div {
    height: min-content;
    padding-top: 70px;
  }

  .error {
    display: flex;
    position: relative;
    flex-direction: column;

    strong {
      font-size: 31px;
      font-weight: bold;
      text-transform: uppercase;
      z-index: 2;
    }

    h1 {
      font-size: 186px;
      font-weight: bold;
      line-height: 150px;
      z-index: 2;
    }

    img {
      right: 0;
      left: -20%;
      bottom: -15%;
      width: 180%;
      position: absolute;
    }
  }

  .help {
    display: flex;
    flex-direction: column;
    margin-left: 220px;

    strong {
      font-size: 18px;

      &:last-of-type {
        margin-bottom: 20px;
      }
    }

    a,
    a:visited {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1050px) {
    flex-direction: column;
    padding-top: 350px;

    .help {
      margin: 20px 0;
    }
  }
`;
