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

  return (
    <div
      className="file-item-container prevent-select"
      onClick={props.file.type === 0 ? () => {} : onFolderClick}
    >
      {
        <img
          className="file-item-icon"
          src={
            props.file.type === 0 ? "file_icon32px.svg" : "folder_icon32px.svg"
          }
          alt="nothing"
        ></img>
      }
      <div className="file-item-text-container">
        {props.file.downloadURL && (
          <a href={props.file.downloadURL} target="_blank" rel="noreferrer">
            <p className="file-item-text">{props.file.name}</p>
          </a>
        )}
      </div>
    </div>
  );
};
