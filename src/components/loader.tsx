import React from "react";

export const Loader: React.FC<{
  width: number;
  height: number;
  borderWidth: number;
}> = (props) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        className="spinner-border"
        style={{
          color: "tomato",
          width: props.width,
          height: props.height,
          borderWidth: props.borderWidth,
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
