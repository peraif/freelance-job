/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
import {
  React, useState, useEffect, useRef,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToastify } from '../../contexts/ToastifyContext';

const AddModal = () => {
  const { successToast } = useToastify();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [validationError, setValidationError] = useState('');
  const auth = useAuth();
  const soc = useSocket();
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const ChannelValidate = yup.object().shape({
    nameChannel: yup
      .string()
      .required(t('modal.required'))
      .min(3, t('modal.nameLenght'))
      .max(20, t('modal.nameLenght'))
      .notOneOf(namesChannels, t('modal.duplicate')),
  });
  return (
    <Formik
      initialValues={
      {
        nameChannel: '',
      }
  }
      validationSchema={ChannelValidate}
      onSubmit={(values) => {
        try {
          setValidationError(null);
          const newChannel = {
            id: _.uniqueId(), name: values.nameChannel, author: auth.getUserName(), removable: true,
          };
          soc.addNewChannel(newChannel);
          successToast(t('addChannelToast'));
          dispatch(closeModal());
        } catch (err) {
          setValidationError(err.message);
        }
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <Modal centered show onHide={() => dispatch(closeModal())}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.addChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  id="nameChannel"
                  onChange={handleChange}
                  ref={inputRef}
                  value={values.nameChannel}
                  data-testid="input-name"
                  name="nameChannel"
                  isInvalid={!!errors.nameChannel}
                  className="mb-2"
                />
                <Form.Label className="visually-hidden" htmlFor="nameChannel">{t('modal.name')}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip placement="right">
                  {errors.nameChannel ? errors.nameChannel : null}
                </Form.Control.Feedback>
                <div className="invalid-fb">{t(validationError)}</div>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary">
                  {t('modal.cancelButton')}
                </Button>
                <Button onClick={handleSubmit} type="submit" variant="primary">
                  {t('modal.addButton')}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default AddModal;
