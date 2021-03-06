import firebase from "firebase";
import React, { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../../../../redux/actions/files/files.actions";
import { CurrentScope } from "../../../../../redux/states/file.state";
import { RootState } from "../../../../../redux/store";
import { FileModel } from "../../../../../viewmodels/file.model";

export const CreateFolder: React.FC = () => {
  const dispatch = useDispatch();
  const { currentFiles, currentParentFolderPath, currentScope } = useSelector(
    (state: RootState) => state.files
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [createFolderValidated, setCreateFolderValidated] = useState(false);
  const uid = firebase.auth().currentUser?.uid;

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
    <div>
      <button onClick={handleShow} disabled={currentScope !== CurrentScope.MY_FILES ? true : false} className="left-panel-button prevent-select">
        Create Folder
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
