import { Frame, Toast } from '@shopify/polaris';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface IToastMessage {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'error';
}

interface ToastContextType {
  addToast: (message: string, type?: 'info' | 'success' | 'error') => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<IToastMessage[]>([]);

  const addToast = (
    message: string,
    type: 'info' | 'success' | 'error' = 'info'
  ) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <Frame>
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            content={toast.message}
            onDismiss={() => removeToast(toast.id)}
            {...(toast.type === 'error' && { error: true })}
          />
        ))}
      </Frame>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
