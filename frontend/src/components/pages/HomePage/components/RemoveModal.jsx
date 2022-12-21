/* eslint-disable max-len */
import { React } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../slices/modalSlice';
import { selectors, changeCurrentChannelID } from '../../../../slices/channelsSlice';
import { useApi } from '../../../../contexts/SocketContext';
import { useToastify } from '../../../../contexts/ToastifyContext';

const RemoveModal = ({ currectChannelID }) => {
  const { successToast } = useToastify();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const soc = useApi();
  const { item } = useSelector((store) => store.modal);

  const currentChannel = useSelector((state) => selectors.selectAll(state).find((it) => it.id === item));

  const startChannelId = 1;
  const handleRemove = () => {
    soc.deleteChannel(currentChannel);
    dispatch(closeModal());
    successToast(t('removeChannelToast'));
    if (currectChannelID === currentChannel.id) {
      dispatch(changeCurrentChannelID(startChannelId));
    }
  };
  return (
    <Modal centered show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.questionRemove')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModal())} type="button" variant="secondary" className="me-2">{t('modal.cancelButton')}</Button>
          <Button onClick={handleRemove} type="button" variant="danger">{t('modal.removeButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
