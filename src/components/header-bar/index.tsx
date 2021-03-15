import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/auth/auth.actions";
import { RootState } from "../../redux/store";
import "./header.css";

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { currentParentFolderPath } = useSelector((state: RootState) => state.files);
  console.log(currentParentFolderPath);
  const signOut = async () => {
    await dispatch(logOut());
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <p className="logo-style prevent-select">Drive</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nac" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <div className="mr-auto">
        <h6 style={{marginBottom: "0"}}>{currentParentFolderPath}</h6>
        </div>
        <h5 style={{marginBottom: "0"}} className="mr-sm-2">{user?.firstName}</h5>
        <Button
          className="mr-sm-2"
          style={{ float: "left", background: "red", border: "none" }}
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
