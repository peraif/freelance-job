/* eslint-disable react/jsx-no-constructed-context-values */
import { React, createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ToastifyContext = createContext({});

export const ToastifyProvider = ({ children }) => {
  const successToast = (messeger) => toast.success(messeger, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
  const errorToast = (messeger) => toast.error(messeger, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  return (
    <ToastifyContext.Provider value={{ successToast, errorToast }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      { children }
    </ToastifyContext.Provider>
  );
};

export const useToastify = () => useContext(ToastifyContext);
