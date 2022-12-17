/* eslint-disable no-undef */
import { React } from 'react';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../slices/modalSlice';
import { changeChannelID } from '../../slices/channelsSlice';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';
import AddModal from './AddModal';

const Channels = ({ channels, currectChannelID }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { type } = useSelector((store) => store.modal);
  const classButton = 'w-100 rounded-0 text-start btn text-truncate btn-light';
  const activeClassButton = 'w-100 rounded-0 text-start btn text-truncate btn-secondary shadow-none';
  const classBtnGroup = 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn noborder-btn btn-light';
  const changeCurrentID = (id) => {
    dispatch(changeChannelID(id));
  };
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button onClick={() => dispatch(openModal({ type: 'adding' }))} type="button" variant="light" className="btn-plus p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((item) => (
          <li key={item.id} className="nav-item w-100">
            <ButtonGroup className="d-flex dropdown btn-group channelsBtn">
              <Button
                onClick={() => changeCurrentID(item.id)}
                type="button"
                className={item.id === currectChannelID ? activeClassButton : classButton}
              >
                <span className="me-1">#</span>
                {item.name}
              </Button>
              {item.removable
                && (
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className={item.id === currectChannelID ? activeClassButton : classBtnGroup}>
                      <span className="visually-hidden">{t('modal.channelManagement')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', itemId: item.id }))} variant="light" eventKey="1">{t('modal.removeChannel')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', itemId: item.id }))} variant="light" eventKey="2">{t('modal.renameChannel')}</Dropdown.Item>
                      {type === 'removing' && <RemoveModal currectChannelID={currectChannelID} />}
                      {type === 'renaming' && <RenameModal />}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
            </ButtonGroup>
          </li>
        ))}
      </ul>
      {type === 'adding' && <AddModal />}
    </div>
  );
};

export default Channels;
