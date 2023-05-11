import { CircularProgress } from "@mui/material";
import { AnimationLayout } from "components";
import { Auth, Error, MultiTabError } from "pages";
import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";

const Home = lazy(() => import("pages/Home"));

const Router = () => {
  const [anotherTab, setAnotherTab] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel("react-contacts");
    channel.postMessage("another-tab");
    const timer = setTimeout(() => {
      channel.addEventListener("message", (msg) => {
        if (msg.data === "another-tab") {
          setAnotherTab(true);
        }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {anotherTab ? (
        <MultiTabError />
      ) : (
        <BrowserRouter>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route element={<AnimationLayout />}>
                <Route path="/" element={<Auth />} />
                <Route
                  path="/home"
                  element={
                    <AuthRoute>
                      <Home />
                    </AuthRoute>
                  }
                />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
};

export default Router;
