import React from "react";
import { useDispatch } from "react-redux";
import { CHANGE_CURRENT_FOLDER } from "../../../../../redux/actions/files/files.interface";
import { FileModel } from "../../../../../viewmodels/file.model";
import "./file-item.css";

interface IFileItemProps {
  file: FileModel;
}

export const FileItem: React.FC<IFileItemProps> = (props: IFileItemProps) => {
  const dispatch = useDispatch();

  const onFolderClick = () => {
    dispatch({
      type: CHANGE_CURRENT_FOLDER,
      folderName: props.file.name,
      folderPath: props.file.path,
    });
  };

  const onShareFolderClick = () => {

  }

  if (props.file.type === 0) {
    return (
      <div className="file-item-container prevent-select">
        <img
          className="file-item-icon"
          src="file_icon32px.svg"
          alt="file_icon"
        ></img>
        <div className="file-item-text-container">
          {props.file.downloadURL && (
            <a href={props.file.downloadURL} target="_blank" rel="noreferrer">
              <p className="file-item-text">{props.file.name}</p>
            </a>
          )}
        </div>
        <img
          style={{ gridArea: "1 / 3 / 3 / 3", marginRight: "10px" }}
          src="share_icon.svg"
          alt="share_icon"
        ></img>
      </div>
    );
  }

  const folderName = props.file.name.slice(0, props.file.name.length - 1);

  return (
    <div className="file-item-container prevent-select" onClick={onFolderClick}>
      <img
        className="file-item-icon"
        src="folder_icon32px.svg"
        alt="nothing"
      ></img>
      <div className="file-item-text-container">
        <p className="file-item-text">{folderName}</p>
      </div>
      <img onClick={onShareFolderClick}
        style={{ gridArea: "1 / 3 / 3 / 3", marginRight: "10px" }}
        src="share_icon.svg"
        alt="share_icon"
      ></img>
    </div>
  );
};
