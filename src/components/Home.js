import { Button } from "react-bootstrap";
import { useState } from "react";
import ModalComp from "./Modal";
import TableComp from "./Table";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [contactDetails, setContactDetails] = useState({});
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModal, setSelectedModal] = useState();

  const [allContacts, setAllContacts] = useState({});
  const [contacts, setContacts] = useState({});

  const fetchData = async (countryId, query) => {
    setLoading(true);
    try {
      const apiUrl = new URL(
        "https://api.dev.pastorsline.com/api/contacts.json"
      );
      apiUrl.searchParams.append("companyId", "171");
      query && apiUrl.searchParams.append("query", query);
      apiUrl.searchParams.append("page", "1");
      countryId && apiUrl.searchParams.append("countryId", countryId);
      apiUrl.searchParams.append("noGroupDuplicates", "1");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4",
          Origin: "http://127.0.0.1:30080",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      setAllContacts(data);
      setContacts(data.contacts);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  console.log(contacts);

  const handleModalA = () => {
    setSelectedModal("A");
    window.history.pushState({}, "", "/modal-a");
    setShowModal(true);
    setModalTitle("All contacts");
    fetchData();
  };

  const handleModalB = () => {
    setSelectedModal("B");
    window.history.pushState({}, "", "/modal-b");
    setShowModal(true);
    setModalTitle("US contacts");
    fetchData(226);
  };

  const handleEvenContacts = (e) => {
    if (e.target.checked) {
      const evenContacts = {};
      for (const key in allContacts.contacts) {
        if (key % 2 === 0) {
          evenContacts[key] = contacts[key];
        }
      }
      setContacts(evenContacts);
    } else {
      setContacts(allContacts.contacts);
    }
  };

  const handleContactDetails = (details) => {
    setShowDetailsModal(true);
    setContactDetails(details);
  };

  const searchContacts = (e) => {
    if (selectedModal === "B") {
      fetchData(226, e);
    } else {
      fetchData(null, e);
    }
  };

  const handleSearch = (e) => {
    let timer;
    const val = e;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      searchContacts(val);
    }, 1000);
  };

  const handleSearchSubmit = (e) => {
    searchContacts(e);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <ModalComp show={showModal} setShow={setShowModal} title={modalTitle}>
          <ContactList
            setShow={setShowModal}
            loading={loading}
            handleModalA={handleModalA}
            handleModalB={handleModalB}
            handleEvenContacts={handleEvenContacts}
            handleSearch={handleSearch}
            handleSearchSubmit={handleSearchSubmit}
          >
            <TableComp
              contacts={contacts}
              handleContactDetails={handleContactDetails}
            />
          </ContactList>
        </ModalComp>
        <ModalComp
          show={showDetailsModal}
          setShow={setShowDetailsModal}
          title={"Contact details"}
        >
          <ContactDetails
            setShow={setShowDetailsModal}
            contactDetails={contactDetails}
          />
        </ModalComp>
        <Button
          style={{ backgroundColor: "#46139f", border: "none" }}
          onClick={handleModalA}
        >
          Button A
        </Button>
        <Button
          style={{
            marginLeft: "10px",
            backgroundColor: "#ff7f50",
            border: "none",
          }}
          onClick={handleModalB}
        >
          Button B
        </Button>
      </div>
    </>
  );
}

export default Home;
