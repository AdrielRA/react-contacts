import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MultiTab from "./MultiTab";
import { Container } from "./styles";

interface ErrorPageProps {
  onReset?: () => void;
  statusCode?: number;
  message?: string;
}

const Error: React.FC<ErrorPageProps> = ({ statusCode, message, onReset }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.error(history.state?.error);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  let status = Math.abs(Number(pathname.split("/")[2]));
  status =
    Number.isNaN(status) || status <= 300 || status >= 600
      ? statusCode ?? 404
      : status;

  return (
    <Container>
      <div className="help">
        <Typography variant="h1" color="error">
          {status}
        </Typography>
        <strong>
          {message ?? "A pagina solicitada parece que esta fora do ar."}
        </strong>
        <strong>
          Use a nossa pesquisa ou volte para{" "}
          <Link onClick={onReset} to="/">
            home
          </Link>
          .
        </strong>
      </div>
    </Container>
  );
};

export const MultiTabError = MultiTab;
export default Error;
