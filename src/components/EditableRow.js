import React from "react";

const EditableRow = ({}) => {
    return(
        <tr>
            <td>{contact.id}</td>
            <td>{
                <input type="text"
                        required="required"
                        placeholder="Enter a first name..."
                        name="First Name">
                    {/*value={editFormatData.firstName}*/}
                    {/*onChange={handleEditFormChange}*/}
                </input>}
            </td>
            <td>{<input type="text"
                        required="required"
                        placeholder="Enter a last name..."
                        name="Last Name">
                {/*value={editFormatData.lastName}*/}
                {/*onChange={handleEditFormChange}*/}
            </input>}</td>
            <td>{<input type="text"
                        required="required"
                        placeholder="Enter a email..."
                        email="email">
                {/*value={editFormatData.email}*/}
                {/*onChange={handleEditFormChange}*/}
            </input>}</td>
            <td>{<input type="text"
                        required="required"
                        placeholder="Enter a phone..."
                        name="Phone"
                // value={editFormatData.phoneNumber}
                // onChange={handleEditFormChange}
           ></input>}
            </td>
            <td>
                <button type="submit">Save</button>
            </td>
        </tr>
    );
};
export default EditableRow;