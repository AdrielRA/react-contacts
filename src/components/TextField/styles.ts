import styled from "styled-components";

interface InputStyleProps {
  resize?: "none" | "both" | "horizontal" | "vertical";
  rows?: number;
}

export const Container = styled.input<InputStyleProps>`
  margin: 4px 0;
  width: 100%;

  .MuiInputBase-root {
    resize: ${({ resize }) => resize};
    overflow: ${({ resize }) =>
      resize === undefined || resize === "none" ? "unset" : "auto"};

    min-height: ${({ resize }) =>
      resize !== undefined && resize !== "none" ? "54px" : "unset"};

    textarea {
      height: ${({ resize }) =>
        resize !== undefined && resize !== "none"
          ? "100% !important"
          : "unset"};
    }
  }
`;
