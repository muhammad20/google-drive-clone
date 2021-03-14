import React, { useState } from "react";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/auth/auth.actions";
import { createFolder } from "../../redux/actions/files/files.actions";
import { RootState } from "../../redux/store";
import { FileModel } from "../../viewmodels/file.model";
import firebase from "../../firebase/app-config";
import "./header.css";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentFiles, currentParentFolderPath } = useSelector(
    (state: RootState) => state.files
  );

  const signOut = () => {
    dispatch(logOut());
  };

  const uid = firebase.auth().currentUser?.uid;

  const [createFolderValidated, setCreateFolderValidated] = useState(false);


  const handleFolderCreationSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setCreateFolderValidated(false);
      return;
    } else {
      const folderName = `${form[0].value}/`;
      const folderPath = `${currentParentFolderPath}${folderName}`;
      const certainUID = uid == null ? "" : uid;
      const folder = new FileModel(
        certainUID,
        1,
        folderName,
        currentParentFolderPath,
        folderPath
      );
      dispatch(createFolder(folder, currentFiles, currentParentFolderPath));
      setCreateFolderValidated(true);
    }
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <p className="logo-style">Drive</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nac" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Form
        className="mr-auto"
          inline
          noValidate
          validated={createFolderValidated}
          onSubmit={handleFolderCreationSubmit}
          action={""}
        >
          <FormControl
            required
            type="text"
            name="folder"
            placeholder="Folder name"
            className="mr-sm-2"
          />
          <FormControl
            required
            type="submit"
            value="Create Folder"
            placeholder="Create Folder"
            className="mr-sm-2"
          />
        </Form>
        <Button className="mr-auto" style={{float: 'left', background: 'red'}} onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
