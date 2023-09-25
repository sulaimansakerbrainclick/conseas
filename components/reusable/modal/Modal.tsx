import Box from "@mui/material/Box";
import MaterialModal from "@mui/material/Modal";
import classNames from "classnames";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,0%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

interface Props {
  open: boolean;
  onClose(): void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ open, onClose, children, className }: Props) => {
  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ ...defaultStyle }}
        className={classNames(`p-6 lg:p-8 min-w-[90vw] lg:min-w-[40vw] rounded-md`, className)}
      >
        {children}
      </Box>
    </MaterialModal>
  );
};

export default Modal;
