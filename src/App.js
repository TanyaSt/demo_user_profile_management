import React, {useState, Fragment} from "react";
import "./App.css";
import data from "./services/api.js";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import {toHaveFormValues} from "@testing-library/jest-dom/dist/matchers";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);

  const handleEditClick = (event, contact)=> {
    event.preventDefault();
    setEditContactId(contact.id);
  }
  const handleEditFormSubmit =(event)=> {
    event.preventDefault();
    const editContact ={
      id: editFormData.id,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      phone: editFormData.phone,
      gender: editFormData.gender,
    };
         setEditFormData(toHaveFormValues);
  };

  const handleDeleteClick = (contactId) =>{
      const newContacts = [...contact];

      const index = contacts.findIndex((contact)=> contact.id === contactId);
      newContacts.splice(index, 1);
      setContacts(newContacts);
  }

  return( <div className="app=container">
        <form>
    <table>
      <thead>
        <tr>
          <th>SN</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Update</th>
          <th>Delete</th>

        </tr>
      </thead>
      <tbody>
        {contacts.map((contact)=> (
            <Fragment>
              {editContactId === contact.id ? (<EditableRow />
              ) : (
              <ReadOnlyRow contact ={contact}
                           handleEditClick={handleEditClick}
                           handleDeleteClick={handleDeleteClick}
              />
              )}
            </Fragment>
              ))}
            </tbody>
          </table>
        </form>
        );
  </div>
  );
};

export default App;

