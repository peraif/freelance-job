import { React } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm';
import imageAvatarSg from '../../../assets/avatar_signup.jpg';

const RegisterPage = () => {
  const { t } = useTranslation();
  return (
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
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('signUpPage.haveAccount')}
                  {' '}
                </span>
                <Link to="/login">{t('signUpPage.login')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
