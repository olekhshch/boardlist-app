import React from "react";

const Circle = ({ r, colour }) => {
  return (
    <svg width={2 * r} height={2 * r}>
      <circle r={r} cx={r} cy={r} fill={`var(--${colour}-main)`} />
    </svg>
  );
};

export default Circle;
