/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { useApi } from '../../../../contexts/SocketContext';
import { channelsLoading, currentChatSelector } from '../../../../slices/channelsSlice';

const Messages = ({ message, currectChannelID, correctChatName }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const soc = useApi();
  const messagesEndRef = useRef(null);
  const currentChat = useSelector(currentChatSelector);
  const ref = useRef(null);
  const loadingStatus = useSelector(channelsLoading);
  const chatName = useMemo(() => {
    if (loadingStatus === 'loading') {
      return <>Loading...</>;
    }
    return `# ${correctChatName}`;
  }, [loadingStatus]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    ref.current.focus();
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    scrollToBottom();
  });
  const textSchema = yup.object().shape({
    text: yup.string().required(''),
  });

  return (
    <Formik
      initialValues={
      {
        text: '',
      }
  }
      validationSchema={textSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const messageText = filter.clean(values.text);
          const messageNew = {
            channelId: currectChannelID,
            username: auth.getUserName(),
            text: messageText,
          };
          soc.sendNewMessage(messageNew);
          resetForm();
        } catch (err) {
          console.log(err.message);
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
        isSubmitting,
      }) => (
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{chatName}</b>
              </p>
              <span className="text-muted">{t('messagesQuantity.counter.count', { count: message.length })}</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              {message?.map((item) => (
                <div key={item.id} className="text-break mb-2">
                  <b>{item.username}</b>
                  :
                  {' '}
                  {item.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="mt-auto px-5 py-3">
              <form className="py-1 border rounded-2" onSubmit={handleSubmit}>
                <div className="input-group has-validation">
                  <input
                    ref={ref}
                    className="border-0 p-0 ps-2 form-control"
                    type="text"
                    name="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.text}
                    aria-label="Новое сообщение"
                    placeholder={t('messageForm')}
                  />
                  {errors.text && touched.text && errors.text}
                  <Button variant="light" type="submit" className="btn btn-group-vertical" disabled={isSubmitting}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Messages;
