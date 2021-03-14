import React from "react";
import "./left-panel.css";

export const LeftPanel: React.FC = () => {
  return (
    <div className="left-panel-container">
      <div className="left-panel-buttons-container">
        <button className="left-panel-button prevent-select">My Files</button>
        <button className="left-panel-button prevent-select">Upload File</button>
        <button className="left-panel-button prevent-select">Shared With Me</button>
        <button className="left-panel-button prevent-select">Shared With Others</button>
      </div>
    </div>
  );
};
