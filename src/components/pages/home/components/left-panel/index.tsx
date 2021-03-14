import React, { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../../../redux/actions/files/files.actions";
import "./left-panel.css";
import { RootState } from "../../../../../redux/store";
import { CHANGE_CURRENT_FOLDER } from "../../../../../redux/actions/files/files.interface";

export const LeftPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { currentParentFolderPath } = useSelector(
    (state: RootState) => state.files
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let fileToUpload: any = {};

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    fileToUpload = file;
  };

  const uploadNewFile = async () => {
    console.log(fileToUpload);
    if (fileToUpload.name == null) return;
    await dispatch(uploadFile(fileToUpload, currentParentFolderPath));
    handleClose();
  };

  const handleOnClikMyFiles = () => {
    dispatch({
      type: CHANGE_CURRENT_FOLDER,
      folderName: "/",
      folderPath: "/",
    });
  };

  return (
    <div className="left-panel-container">
      <div className="left-panel-buttons-container">
        <button
          onClick={handleOnClikMyFiles}
          className="left-panel-button prevent-select"
        >
          My Files
        </button>
        <button
          onClick={handleShow}
          className="left-panel-button prevent-select"
        >
          Upload File
        </button>
        <button className="left-panel-button prevent-select">
          Shared With Me
        </button>
        <button className="left-panel-button prevent-select">
          Shared With Others
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormControl
              required
              type="file"
              name="File"
              onChange={onFileChange}
              className="mr-sm-2"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={uploadNewFile}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
