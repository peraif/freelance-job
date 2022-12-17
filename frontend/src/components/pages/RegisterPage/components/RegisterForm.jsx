/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import routes from '../../../../routes/routes';
import { useAuth } from '../../../../contexts/AuthContext.jsx';

const RegisterFrom = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const SignupSchema = yup.object().shape({
    username: yup.string().required('signUpPage.required').min(3, 'signUpPage.usernameLenght').max(20, 'signUpPage.usernameLenght'),
    password: yup.string().required('signUpPage.required').min(6, 'signUpPage.minPasswordLenght'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'signUpPage.passwordConErr'),
  });
  const navigate = useNavigate();
  const authUser = useAuth();
  return (
    <Formik
      initialValues={
    {
      username: '',
      password: '',
      confirmPassword: '',
    }
}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        // eslint-disable-next-line no-empty
        try {
          const res = await axios.post(routes.signupPath(), values);
          authUser.logIn(res.data);
          setAuthFailed(false);
          console.log(res.data);
          navigate('/');
        } catch (err) {
          if (err.response.status === 409) {
            setAuthFailed(true);
            console.log(err);
          }
          throw err;
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 sign-text">{t('signUpPage.title')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              required
              placeholder={t('signUpPage.username')}
              isInvalid={(errors.username && touched.username) || authFailed}
              autoComplete="username"
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <Form.Label htmlFor="username">{t('signUpPage.username')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {(t(errors.username))}
            </Form.Control.Feedback>

          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              placeholder={t('signUpPage.password')}
              required
              autoComplete="new-password"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={(errors.password && touched.password) || authFailed}
            />
            <Form.Label htmlFor="password">{t('signUpPage.password')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {(t(errors.password))}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              autoComplete="new-password"
              placeholder={t('signUpPage.confirmPassword')}
              type="password"
              required
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              isInvalid={errors.confirmPassword || authFailed}
            />
            <Form.Label htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {authFailed ? t('signUpPage.authFailed') : (t(errors.confirmPassword))}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="w-100 mb-3">
            {t('signUpPage.signUp')}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterFrom;
