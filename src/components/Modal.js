import Modal from "react-bootstrap/Modal";

function ModalComp({
  show,
  setShow,
  title,
  children,
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
       {children}
      </Modal>
    </>
  );
}

export default ModalComp;
