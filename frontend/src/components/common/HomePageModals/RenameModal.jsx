import {
  React, useState, useEffect, useRef,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  FloatingLabel, Form, Button, Modal,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, modalSelector } from '../../../slices/modalSlice';
import { currentChannelsSelector, namesChannelsSelector } from '../../../slices/channelsSlice';
import { useApi } from '../../../contexts/SocketContext';
import { useToastify } from '../../../contexts/ToastifyContext';

const RenameModal = () => {
  const { successToast } = useToastify();
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { fnRenameChannel } = useApi();
  const { item } = useSelector(modalSelector);
  const namesChannels = useSelector(namesChannelsSelector);
  const currentChannel = useSelector((state) => currentChannelsSelector(state, item));
  const { id, name } = currentChannel;
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const validateRename = yup.object().shape({
    renameChannel: yup
      .string()
      .required('modal.required')
      .min(3, 'modal.nameLenght')
      .max(20, 'modal.nameLenght')
      .notOneOf(namesChannels, 'modal.duplicate'),
  });

  const closeRenameModal = () => dispatch(closeModal());

  return (
    <Formik
      initialValues={
      {
        renameChannel: name,
      }
  }
      validationSchema={validateRename}
      onSubmit={(values) => {
      // eslint-disable-next-line no-empty
        try {
          const { renameChannel } = values;
          fnRenameChannel({ id, name: renameChannel });
          setValidationError(null);

          dispatch(closeModal());
          successToast(t('renameChannelToast'));
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
        <>
          <Modal.Header closeButton>
            <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <FloatingLabel
                  controlId="renameChannel"
                  label={t('modal.name')}
                >
                  <Form.Control
                    value={values.renameChannel}
                    ref={inputRef}
                    data-testid="input-name"
                    name="renameChannel"
                    onChange={handleChange}
                    isInvalid={!!errors.renameChannel}
                    className="mb-2"
                  />
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {errors.renameChannel ? (t(errors.renameChannel)) : null}
                  </Form.Control.Feedback>
                  <div className="invalid-fb">{t(validationError)}</div>
                </FloatingLabel>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button onClick={closeRenameModal} className="me-2" variant="secondary">{t('modal.cancelButton')}</Button>
                <Button onClick={handleSubmit} type="submit" variant="primary">{t('modal.addButton')}</Button>
              </div>
            </Form>
          </Modal.Body>
        </>
      )}
    </Formik>
  );
};

export default RenameModal;
