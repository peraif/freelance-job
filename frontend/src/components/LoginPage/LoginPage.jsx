import { React } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import imageAvatar from '../../assets/avatar.jpg';
import '../../index.css';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row colomn-login">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={imageAvatar} className="rounded-circle" width="200px" alt="" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('loginPage.notAccount')}
                  {' '}
                </span>
                <Link to="/signup">{t('loginPage.signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default LoginPage;
