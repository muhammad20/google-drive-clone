import React, { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../../../redux/actions/files/files.actions";
import { CurrentScope } from "../../../../../redux/states/file.state";
import { RootState } from "../../../../../redux/store";

export const UploadFile: React.FC = () => {
  const dispatch = useDispatch();
  const { currentParentFolderPath, currentScope } = useSelector(
    (state: RootState) => state.files
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let fileToUpload: any = {};

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    fileToUpload = file;
  };

  const uploadNewFile = async () => {
    if (fileToUpload.name == null) return;
    await dispatch(uploadFile(fileToUpload, currentParentFolderPath));
    handleClose();
  };

  return (
    <div>
      <button onClick={handleShow} disabled={currentScope !== CurrentScope.MY_FILES ? true : false} className="left-panel-button prevent-select">
        Upload File
      </button>
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
