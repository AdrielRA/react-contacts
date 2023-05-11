/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo } from "react";

interface ErrorProps {
  children?: React.ReactNode;
}
const ErrorBoundary: React.FC<ErrorProps> = ({ children }) => {
  const ignored = useMemo(() => ["ResizeObserver"], []);
  const onError = useCallback(
    (error: ErrorEvent) => {
      if (ignored.some((i) => error.message.match(`${i}`))) {
        console.warn({ Ignored: error });
        return;
      }
      //LoggerController.error(error.error || error);
      // window.history.pushState(
      //   { error: error.error ?? error },
      //   "",
      //   "/error/500",
      // );
      // window.location.href = "/error/500";
    },
    [ignored],
  );
  useEffect(() => {
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("error", onError);
    };
  }, [onError]);

  return <>{children}</>;
};
export default ErrorBoundary;
