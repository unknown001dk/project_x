import { toast } from 'react-toastify';

export const toastSucess = async (message ) => {
  toast.success(message);
}

export const toastError = async (message ) => {
  toast.error(message);
}

export const toastInfo = async (message ) => {
  toast.info(message);
}

export const toastWarning = async (message ) => {
  toast.warn(message);
}
