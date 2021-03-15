import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedFiles } from "../../../../../../redux/actions/files/files.actions";
import { GET_SHARED_FILES } from "../../../../../../redux/actions/files/files.interface";
import { RootState } from "../../../../../../redux/store";
import "./sharer-item.css";

interface ISharerItemProps {
  ownerId: string,
  ownerName: string
}

export const SharerItem: React.FC<ISharerItemProps> = (props: ISharerItemProps) => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.auth.user?.id);

  const onFolderClick = () => {
    console.log(props.ownerId)
    dispatch(getSharedFiles(id == null ? "" : id, props.ownerId));
  };

  return (
    <div className="file-item-container prevent-select" onClick={onFolderClick}>
      <div className="file-item-text-container">
          <p>{props.ownerName}</p>
      </div>
    </div>
  );
};
