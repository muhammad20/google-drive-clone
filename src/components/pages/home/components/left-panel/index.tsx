import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./left-panel.css";
import { CHANGE_CURRENT_FOLDER } from "../../../../../redux/actions/files/files.interface";
import { UploadFile } from "./upload-file";
import { RootState } from "../../../../../redux/store";
import { CreateFolder } from "./create-folder";

export const LeftPanel: React.FC = () => {
  const dispatch = useDispatch();

  const {
    currentParentFolderPath,
  } = useSelector((state: RootState) => state.files);

  const handleOnClikMyFiles = () => {
    dispatch({
      type: CHANGE_CURRENT_FOLDER,
      folderName: "/",
      folderPath: "/",
    });
  };

  const handleOnClickBack = () => {

    let pathToArr = currentParentFolderPath.split('/');
    pathToArr = pathToArr.filter(value => value !== "");
    pathToArr.pop();
    let folderName = `${pathToArr[pathToArr.length - 1]}/`;

    let path = `/${pathToArr.join('/')}`;
    if(path !== '/') {
      path += "/";
    }
    dispatch({
      type: CHANGE_CURRENT_FOLDER,
      folderName: folderName,
      folderPath: path
    });
  };

  return (
    <div className="left-panel-container">
      <div className="left-panel-buttons-container">
        <button
          onClick={handleOnClickBack}
          className="left-panel-button prevent-select"
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
        <button className="left-panel-button prevent-select">
          Shared With Me
        </button>
        <button className="left-panel-button prevent-select">
          Shared With Others
        </button>
      </div>
    </div>
  );
};
