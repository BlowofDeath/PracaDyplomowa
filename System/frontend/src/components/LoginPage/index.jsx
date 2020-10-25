import React from "react";
import "./style.scss";
import { Form, Button, Col, Image, Row } from "react-bootstrap";
import Logo from "../../img/logo.svg";

const LoginPage = (props) => {
  return (
    <Row className="justify-content-md-center">
      <Col md={{ span: 8 }} className="login-box mt-sm-5">
        <Image className="logo" src={Logo} />
        <h2 className="text-center">Zaloguj</h2>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Email:
            </Form.Label>
            <Col sm="8">
              <Form.Control placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Hasło:
            </Form.Label>
            <Col sm="8">
              <Form.Control type="password" placeholder="Hasło" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextLoginAs">
            <Form.Label column sm="4">
              Zaloguj jako:
            </Form.Label>
            <Col sm="8">
              <Form.Control as="select" defaultValue="Student">
                <option>Student</option>
                <option>Opiekun praktyk</option>
                <option>Firma</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="4"></Form.Label>
            <Col sm="8">
              <Button variant="light">Zaloguj</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
