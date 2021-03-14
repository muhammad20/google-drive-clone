import React, { useState } from "react";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/auth/auth.actions";
import { createFolder } from "../../redux/actions/files/files.actions";
import { RootState } from "../../redux/store";
import { FileModel } from "../../services/viewmodels/file.model";
import firebase from "../../firebase/app-config";
import "./header.css";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentFiles, currentFolderPath, currentFolderName } = useSelector(
    (state: RootState) => state.files
  );

  const [newFolder, setNewFolder] = useState<FileModel>(
    new FileModel("", -1, "", "", "")
  );

  const signOut = () => {
    dispatch(logOut());
  };

  const uploadNewFile = () => {};

  const createNewFolder = () => {
    dispatch(createFolder(newFolder, currentFiles, currentFolderName));
  };

  const uid = firebase.auth().currentUser?.uid;

  const [createFolderValidated, setCreateFolderValidated] = useState(false);
  // const [uploadFileValidate, setUploadFileValidate] = useState(false);

  const handleFolderCreationSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setCreateFolderValidated(false);
      return;
    } else {
      const folderName = `${form[0].value}/`;
      const folderPath = `${currentFolderPath}${folderName}`;
      const certainUID = uid == null ? "" : uid;
      const folder = new FileModel(
        certainUID,
        1,
        folderName,
        currentFolderName,
        folderPath
      );
      setNewFolder(folder);

      createNewFolder();
      setCreateFolderValidated(true);
    }
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <p className="logo-style">Drive</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nac" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form
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
        <Form
          noValidate
          validated={createFolderValidated}
          onSubmit={handleFolderCreationSubmit}
        >
          <FormControl
            required
            type="file"
            name="File"
            placeholder="File to upload"
            className="mr-sm-2"
          />
          <Button onClick={uploadNewFile} variant="outline-success">
            Upload File
          </Button>
        </Form>
        <Button onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
