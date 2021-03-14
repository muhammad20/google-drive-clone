import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { FileItem } from "../file-item";
import "./files-area.css";

export const FilesArea: React.FC = () => {
  let { currentFiles } = useSelector((state: RootState) => state.files);

  return (
    <div className="files-area-container">
      {currentFiles.map((file) => {
        return <FileItem file={file} />;
      })}
    </div>
  );
};
