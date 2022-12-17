import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import filter from 'leo-profanity';
import AppInit from './components/index';
import store from './slices/store';
import resources from './locales/index';
import { addMessage } from './slices/messageSlice';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice';
import { ApiProvider } from './contexts/SocketContext';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const socketSubscriptions = [
  { key: 'newMessage', actionCreator: addMessage },
  { key: 'newChannel', actionCreator: addChannel },
  { key: 'removeChannel', actionCreator: removeChannel },
  { key: 'renameChannel', actionCreator: renameChannel },
];

const App = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  const socketOn = (arr) => {
    arr.forEach((item) => {
      socket.on(item.key, (id) => {
        store.dispatch(item.actionCreator(id));
      });
    });
  };

  socketOn(socketSubscriptions);

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ApiProvider value={{ socket }}>
              <AppInit />
            </ApiProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

export default App;
