import React from "react";
import "./file-item.css";

interface FileProps {
  filename: string;
  fileType: number;
}

export const FileItem: React.FC<FileProps> = (props: FileProps) => {
  return (
    <div className="file-item-container prevent-select">
      {
        <img
          className="file-item-icon"
          src={
            props.fileType === 0
              ? "file_icon32px.svg"
              : "folder_icon32px.svg"
          }
          alt="nothing"
        ></img>
      }
      <div className="file-item-text-container">
        <p className="file-item-text">{props.filename}</p>
      </div>
    </div>
  );
};
