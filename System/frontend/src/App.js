import React from "react";
import { Container } from "react-bootstrap";
import LoginPage from "./components/LoginPage"
import StudentHome from "./components/StudentHome"
import "./scss/style.scss"

const App = () => {
  return <Container fluid><StudentHome /></Container> ;
}

export default App;
