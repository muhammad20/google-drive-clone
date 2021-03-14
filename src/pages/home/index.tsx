import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { Header } from "../../components/header-bar";
import { getUserFilesOnLogin } from "../../redux/actions/files/files.actions";
import { FilesArea } from "./components/files-area";
import { LeftPanel } from "./components/left-panel";
import firebase from '../../firebase/app-config';
import "./home-page.css";

export const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  let uid = firebase.auth().currentUser?.uid;

  useEffect(() => {
    dispatch(getUserFilesOnLogin(
      uid == null ? '' : uid
    ));
  }, [dispatch, uid]);

  return (
    <>
      <Header />
      <div className="user-area-container">
        <LeftPanel />
        <FilesArea/>
      </div>
    </>
  );
};
