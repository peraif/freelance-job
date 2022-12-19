/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import routes from '../../../../routes/routes';
import { useAuth } from '../../../../contexts/AuthContext.jsx';
import { useToastify } from '../../../../contexts/ToastifyContext';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { errorToast } = useToastify();
  const SignupSchema = yup.object().shape({
    username: yup.string().required(t('loginPage.required')),
    password: yup.string().required(t('loginPage.required')),
  });
  const navigate = useNavigate();
  const authUser = useAuth();
  return (
    <Formik
      initialValues={
    {
      username: '',
      password: '',
    }
}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        // eslint-disable-next-line no-empty
        try {
          const res = await axios.post(routes.loginPath(), values);
          authUser.logIn(res.data);
          setAuthFailed(false);
          console.log(res.data);
          navigate('/');
        } catch (err) {
          if (err.response.status === 401) {
            setAuthFailed(true);
            console.log('ошибка 401');
          } else if (err.message === 'Network Error') {
            errorToast(t('errorNetwork'));
          }
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">{t('loginPage.enter')}</h2>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              placeholder={t('loginPage.username')}
              required
              autoComplete="username"
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              isInvalid={authFailed}
            />
            <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              placeholder={t('loginPage.password')}
              required
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={authFailed}
            />
            <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
            {authFailed && (
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {t('loginPage.noValid')}
            </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button type="submit" className="w-100 mb-3" variant="outline-primary">
            {t('loginPage.enter')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
