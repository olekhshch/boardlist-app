import React from "react";

const Notes = ({ height, colour }) => {
  const topLineY = 0.3 * height;
  const middleLineY = 0.5 * height;
  const bottomLineY = 0.7 * height;

  const lineStartX = 4;
  const lineWidth = 0.5 * height;
  const lineEndX = lineStartX + lineWidth;
  return (
    <svg height={height} width={height}>
      <rect
        height={height - 2}
        width={0.8 * height}
        x="1"
        y="1"
        rx={0.2 * height}
        ry={0.2 * height}
        fill="none"
        stroke={`var(--${colour}-main)`}
        strokeWidth="1"
      />
      <line
        stroke={`var(--${colour}-main)`}
        strokeWidth="1"
        x1={lineStartX}
        y1={topLineY}
        x2={lineEndX}
        y2={topLineY}
      />
      <line
        stroke={`var(--${colour}-main)`}
        strokeWidth="1"
        x1={lineStartX}
        y1={middleLineY}
        x2={lineEndX}
        y2={middleLineY}
      />
      <line
        stroke={`var(--${colour}-main)`}
        strokeWidth="1"
        x1={lineStartX}
        y1={bottomLineY}
        x2={lineEndX}
        y2={bottomLineY}
      />
    </svg>
  );
};

export default Notes;
