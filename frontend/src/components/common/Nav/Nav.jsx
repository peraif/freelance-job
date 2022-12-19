import { React } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';

const Nav = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm navbar navbar-light">
      <Container className="container">
        <Link className="navbar-brand" to="/signup">Hexlet Chat</Link>
        {auth.loggedIn ? <Button onClick={() => auth.logOut()} className="btn-primary">{t('logOut')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
