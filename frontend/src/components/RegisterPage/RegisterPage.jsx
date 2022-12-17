import { React } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import imageAvatarSg from '../../assets/avatar_signup.jpg';
import RegisterForm from './RegisterForm';

const RegisterPage = () => (
  <div className="container-fluid h-100">
    <Row className="row justify-content-center align-content-center h-100">
      <Col xs md="8" xxl="6">
        <Card className="shadow-sm">
          <Card.Body className="p-5 row colomn-login">
            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={imageAvatarSg} className="rounded-circle" width="200px" height="200px" alt="" />
            </Col>
            <RegisterForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

export default RegisterPage;
