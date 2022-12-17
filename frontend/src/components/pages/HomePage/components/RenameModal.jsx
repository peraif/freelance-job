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
import { closeModal } from '../../../../slices/modalSlice';
import { selectors } from '../../../../slices/channelsSlice';
import { useApi } from '../../../../contexts/SocketContext';
import { useToastify } from '../../../../contexts/ToastifyContext';

const RenameModal = () => {
  const { successToast } = useToastify();
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const soc = useApi();
  const { item } = useSelector((store) => store.modal);
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const namesChannels = allChannels.map((it) => it.name);
  const currentChannel = allChannels.find((it) => it.id === item);
  const { id, name } = currentChannel;
  const [validationError, setValidationError] = useState('');
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const validateRename = yup.object().shape({
    renameChannel: yup
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
        renameChannel: name,
      }
  }
      validationSchema={validateRename}
      onSubmit={(values) => {
      // eslint-disable-next-line no-empty
        try {
          const { renameChannel } = values;
          soc.fnRenameChannel({ id, name: renameChannel });
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
        <Modal centered show onHide={() => dispatch(closeModal())}>
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
                    {errors.renameChannel ? errors.renameChannel : null}
                  </Form.Control.Feedback>
                  <div className="invalid-fb">{t(validationError)}</div>
                </FloatingLabel>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button onClick={() => dispatch(closeModal())} className="me-2" variant="secondary">{t('modal.cancelButton')}</Button>
                <Button onClick={handleSubmit} type="submit" variant="primary">{t('modal.addButton')}</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameModal;
