import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Header } from "../../header-bar";
import { getFiles } from "../../../redux/actions/files/files.actions";
import { FilesArea } from "./components/files-area";
import { LeftPanel } from "./components/left-panel";
import firebase from '../../../firebase/app-config';
import "./home-page.css";
import { RootState } from "../../../redux/store";

export const HomePage: React.FC = () => {

  const dispatch = useDispatch();

  let uid = firebase.auth().currentUser?.uid;
  let {currentParentFolderPath} = useSelector((state: RootState) => state.files);
  console.log(currentParentFolderPath);

  useEffect(() => {
    dispatch(getFiles(
      uid == null ? '' : uid,
      currentParentFolderPath
    ));
  }, [dispatch, uid, currentParentFolderPath]);

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
