import React from "react";
import "./style.scss";
import { Navbar, Image, Col, Nav, Container, Button } from "react-bootstrap";
import Logo from "../../img/logo.svg";

const StudentHome = (props) => {
  return (
    <>
      <Navbar
        collapseOnSelec
        expand="lg"
        bg="custom"
        variant="dark"
        className="justify-content-between"
      >
        <Navbar.Brand href="#home">
          <Image className="logo" src={Logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Ogłoszenia praktyk</Nav.Link>
            <Nav.Link href="#link">Umowy</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">jankowalski@example.pl</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Wyloguj
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="main-content">
        <h2>Ogłoszenia praktyk</h2>
        <Col xs={12}>
          <h3>Praktyki na stanowisku frontend developer</h3>
          <span>
            Nazwa firmy: Example z.o.o <br /> Miejsca: 2
          </span>
          <p>
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
            qui esse pariatur duis deserunt mollit dolore cillum minim tempor
            enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
            voluptate aute id deserunt nisi.
          </p>
          <Button variant="custom">Złóż podanie</Button>
        </Col>
        <Col xs={12}>
          <h3>Praktyki na stanowisku frontend developer</h3>
          <span>
            Nazwa firmy: Example z.o.o <br /> Miejsca: 2
          </span>
          <p>
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
            qui esse pariatur duis deserunt mollit dolore cillum minim tempor
            enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
            voluptate aute id deserunt nisi.
          </p>
          <Button variant="custom">Złóż podanie</Button>
        </Col>
      </Container>
    </>
  );
};

export default StudentHome;
