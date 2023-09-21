import Table from 'react-bootstrap/Table';

function TableComp({contacts, handleContactDetails}) {
    const contactArray = Object.values(contacts)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Full phone number</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
    {contactArray && contactArray.map((contact)=>
        <tr onClick={()=> handleContactDetails(contact)}>
          <td>{contact.id}</td>
          <td>{contact.first_name}</td>
          <td>{contact.full_phone_number}</td>
          <td>{contact.phone_number}</td>
        </tr>
        )
    }
      </tbody>
    </Table>
  );
}

export default TableComp;