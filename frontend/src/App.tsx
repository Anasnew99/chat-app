import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./layout/Navbar";
import Container from "./layout/Container";
import { themeObject } from "./config/themes";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import NotFoundPage from "./pages/404Page";
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
              <Route path={"/chat/:id"} component={ChatPage} />
              <Route path={"/"} component={LandingPage} />

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
