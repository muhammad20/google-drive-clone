import React, { useEffect, useState } from "react";
import { Form, FormControl, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { shareFile } from "../../../../../redux/actions/files/files.actions";
import { FileModel } from "../../../../../viewmodels/file.model";
import firebase from "../../../../../firebase/app-config";
import { IUser } from "../../../../../redux/states/user.interface";

interface IShareFileProps {
  file: FileModel;
}

export const ShareFile: React.FC<IShareFileProps> = (
  props: IShareFileProps
) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const uid = firebase.auth().currentUser?.uid;

  // select user with Id
  const [selectedUser, setSelectedUser] = useState<{
    userId: string;
    email: string;
  }>({ userId: "", email: "" });

  const handleOnSelectUserClick = (e: any) => {
    setSelectedUser({
      userId: e.currentTarget.id,
      email: e.currentTarget.children[0].id,
    });
  };

  const [users, setUsers] = useState<IUser[]>([]);

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("/users")
  //     .get()
  //     .then((usersRef) => {
  //       let appUsers: IUser[] = [];
  //       usersRef.forEach((user) => {
  //         if (user.id !== uid) {
  //           appUsers.push({
  //             id: user.id,
  //             firstName: user.data().name,
  //             email: user.data().email,
  //           });
  //         }
  //       });
  //       setUsers(appUsers);
  //     });
  // }, [uid]);

  const handleFileShareSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return;
    } else {
      await dispatch(
        shareFile(uid == null ? "" : uid, props.file, selectedUser.userId)
      );
      setShow(false);
    }
  };

  return (
    <div>
      <img
        onClick={handleShow}
        style={{ gridArea: "2 / 3 / 1 / 3", marginRight: "10px" }}
        src="share_icon.svg"
        alt="share_icon"
      ></img>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mr-auto" onSubmit={handleFileShareSubmit}>
            {users &&
              users.map((user, index) => {
                return (
                  <div
                    className="user-item-container"
                    id={user.id}
                    onClick={handleOnSelectUserClick}
                    key={index}
                  >
                    <p
                      id={user.email === null ? "" : user.email}
                      className="mr-sm-2 prevent-select"
                      style={{ margin: "5px 0px" }}
                    >
                      {`${user.firstName == null ? " " : user.firstName} (${
                        user.email
                      })`}
                    </p>
                  </div>
                );
              })}
            <FormControl
              required
              style={{ marginTop: "10px" }}
              type="submit"
              value="Share"
              className="mr-sm-2"
            />
            <p className="mr-sm-2 prevent-select" style={{ margin: "5px 0px" }}>
              {`selected: ${selectedUser.email}`}
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
