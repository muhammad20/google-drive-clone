import React, { useState } from "react";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/auth/auth.actions";
import { createFolder, uploadFile } from "../../redux/actions/files/files.actions";
import { RootState } from "../../redux/store";
import { FileModel } from "../../viewmodels/file.model";
import firebase from "../../firebase/app-config";
import "./header.css";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentFiles, currentParentFolderPath, currentParentFolderName } = useSelector(
    (state: RootState) => state.files
  );

  const signOut = () => {
    dispatch(logOut());
  };

  const fileToUpload = new FileModel("", -1, "", "", "");

  const uploadNewFile = () => {
    if(fileToUpload.name == null) return;
    dispatch(uploadFile(fileToUpload, currentParentFolderPath));
  };

  const uid = firebase.auth().currentUser?.uid;

  const [createFolderValidated, setCreateFolderValidated] = useState(false);

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    const filePath = `${currentParentFolderPath}${file.name}`;
    const certainUID = uid == null ? "" : uid;
    fileToUpload.name = file.name;
    fileToUpload.parentDirName = currentParentFolderName;
    fileToUpload.type = 0;
    fileToUpload.uid = certainUID;
    fileToUpload.path = filePath;
  };

  const handleFileUploadSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      return;
    } else {
      console.log(form[0].file);
    }
  };

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
          onSubmit={handleFileUploadSubmit}
        >
          <FormControl
            required
            type="file"
            name="File"
            onChange={onFileChange}
            className="mr-sm-2"
          />
          <Button onClick={uploadNewFile}>Upload</Button>
        </Form>
        <Button onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
