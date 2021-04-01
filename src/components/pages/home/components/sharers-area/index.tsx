import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { SharerItem } from "./sharer-item";

export const SharersArea: React.FC = () => {
  let { currentSharers } = useSelector((state: RootState) => state.files);

  return (
    <div className="files-area-container">
      {currentSharers.map((sharer, index) => {
        return <SharerItem ownerName={sharer.ownerName} ownerId={sharer.ownerId} key={index}/>;
      })}
    </div>
  );
};
