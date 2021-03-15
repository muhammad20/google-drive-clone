import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../header-bar";
import { getFiles } from "../../../redux/actions/files/files.actions";
import { FilesArea } from "./components/files-area";
import { LeftPanel } from "./components/left-panel";
import firebase from "../../../firebase/app-config";
import "./home-page.css";
import { RootState } from "../../../redux/store";
import { CurrentScope } from "../../../redux/states/file.state";
import { SharersArea } from "./components/sharers-area";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  let uid = firebase.auth().currentUser?.uid;
  let { currentParentFolderPath, currentScope } = useSelector(
    (state: RootState) => state.files
  );

  useEffect(() => {
    dispatch(getFiles(uid == null ? "" : uid, currentParentFolderPath));
  }, [dispatch, uid, currentParentFolderPath]);

  return (
    <>
      <Header />
      <div className="user-area-container">
        <LeftPanel />
        {currentScope === CurrentScope.MY_FILES ? (
          <FilesArea />
        ) : currentScope === CurrentScope.SHARERS ? (
          <SharersArea />
        ) : (
          <FilesArea />
        )}
      </div>
    </>
  );
};
