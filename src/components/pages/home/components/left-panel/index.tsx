import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./left-panel.css";
import { CHANGE_CURRENT_FOLDER } from "../../../../../redux/actions/files/files.interface";
import { UploadFile } from "./upload-file";
import { RootState } from "../../../../../redux/store";
import { CreateFolder } from "./create-folder";
import { CurrentScope } from "../../../../../redux/states/file.state";
import {
  getFiles,
  getSharers,
} from "../../../../../redux/actions/files/files.actions";

export const LeftPanel: React.FC = () => {
  const dispatch = useDispatch();

  const { currentParentFolderPath, currentScope } = useSelector(
    (state: RootState) => state.files
  );

  const uid = useSelector((state: RootState) => state.auth.user?.id);

  const handleOnClikMyFiles = () => {
    dispatch(getFiles(uid == null ? " " : uid, currentParentFolderPath));
  };

  const handleOnClickBack = () => {
    let pathToArr = currentParentFolderPath.split("/");
    pathToArr = pathToArr.filter((value) => value !== "");
    pathToArr.pop();
    let folderName = `${pathToArr[pathToArr.length - 1]}/`;

    let path = `/${pathToArr.join("/")}`;
    if (path !== "/") {
      path += "/";
    }
    dispatch({
      type: CHANGE_CURRENT_FOLDER,
      folderName: folderName,
      folderPath: path,
    });
  };

  const handleGetSharedFiles = () => {
    dispatch(getSharers(uid == null ? "" : uid));
  };

  return (
    <div className="left-panel-container">
      <p
        style={{
          marginTop: "10px",
          marginBottom: "0",
          fontSize: "12pt",
          fontWeight: 700,
        }}
      >
        {currentScope === CurrentScope.MY_FILES
          ? "MY FILES"
          : currentScope === CurrentScope.SHARERS
          ? "SHARERS"
          : "SHARED WITH ME"}
      </p>
      <div className="left-panel-buttons-container">
        <button
          onClick={handleOnClickBack}
          className="left-panel-button prevent-select"
          disabled={currentScope === CurrentScope.MY_FILES ? false : true}
        >
          Back
        </button>
        <button
          onClick={handleOnClikMyFiles}
          className="left-panel-button prevent-select"
        >
          My Files
        </button>
        <CreateFolder />
        <UploadFile />
        <button
          className="left-panel-button prevent-select"
          onClick={handleGetSharedFiles}
        >
          Shared With Me
        </button>
      </div>
    </div>
  );
};
