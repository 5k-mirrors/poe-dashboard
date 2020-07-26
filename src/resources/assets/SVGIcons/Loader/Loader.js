import React from "react";

const loaderIcon = (width = 50, height = 50) => {
  const viewBox = "0 0 50 50";
  const d =
    "M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z";
  const animateFrom = "0 25 25";
  const animateTo = "360 25 25";
  return (
    <svg width={width} height={height} viewBox={viewBox}>
      <path fill="#FFFFFF" d={d}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={animateFrom}
          to={animateTo}
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default loaderIcon;
