import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

const ContactList = ({
  setShow,
  loading,
  handleModalA,
  handleModalB,
  handleEvenContacts,
  handleSearch,
  handleSearchSubmit,
  children,
}) => {
  const handleClose = () => setShow(false);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <Modal.Body>
        <div className="flex items-center justify-center">
          <Form.Control
            type="email"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value);
            }}
            style={{ margin: "5px 0" }}
          />
          <Button
            style={{
              backgroundColor: "#fff",
              border: "2px solid #46139f",
              color: "#000",
              marginLeft: "5px",
            }}
            size="sm"
            onClick={()=> handleSearchSubmit(searchValue)}
          >
            Search
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          children
        )}
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          type="checkbox"
          id={`even-contacts`}
          label={`Even contacts`}
          onChange={handleEvenContacts}
        />
        <Button
          style={{ backgroundColor: "#46139f", border: "none" }}
          onClick={handleModalA}
        >
          All contacts
        </Button>
        <Button
          style={{ backgroundColor: "#ff7f50", border: "none" }}
          onClick={handleModalB}
        >
          US contacts
        </Button>
        <Button
          style={{
            backgroundColor: "#fff",
            border: "2px solid #46139f",
            color: "#000",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default ContactList;
