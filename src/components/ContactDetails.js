import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ContactDetails = ({
  setShow,
  contactDetails
}) => {
    const handleClose = () => setShow(false);
  return (
    <div>
      <Modal.Body>
        <p>{contactDetails?.id}</p>
        <p>{contactDetails?.first_name}</p>
        <p>{contactDetails?.phone_number}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default ContactDetails;
