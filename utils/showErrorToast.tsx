import { toast } from "react-toastify";

const showErrorToast = (text: string) =>
  toast.error(text || "Error!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export default showErrorToast;
