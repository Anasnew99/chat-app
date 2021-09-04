import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./layout/Navbar";
import Container from "./layout/Container";
import { themeObject } from "./config/themes";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/404Page";
import CreateRoom from "./pages/CreateRoom";
import RoomPage from "./pages/Room";
import UserAccountPage from "./pages/UserAccountPage";
import UserPage from "./pages/UserPage";
const Layout = styled.div``;

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <ThemeProvider theme={themeObject[theme]}>
      <Layout>
        <Navbar
          currentTheme={theme}
          onChangeTheme={(theme) => {
            setTheme(theme);
          }}
        />
        <Router>
          <Container>
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              {/* Create a Room */}
              <Route exact path={"/create"} component={CreateRoom} />
              {/* Join Room and Chat */}
              <Route exact path={`/room/:id`} component={RoomPage} />
              {/* Create User and Log User IN */}
              <Route exact path={"/user"} component={UserAccountPage} />
              {/* See User Details */}
              <Route exact path={"/user/:id"} component={UserPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Container>
        </Router>

        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
