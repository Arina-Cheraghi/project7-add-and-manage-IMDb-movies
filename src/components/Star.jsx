import React from "react";

const starGradientStyle = {
  width: "24px",
  height: "24px",
  cursor: "pointer",
  fill: "#FFD700",
  stroke: "rgba(141,33,255,1)",
  filter: "drop-shadow(0 0 2px rgba(141,33,255,0.5))",
};

function Star({ onClick, full, onHoverIn, onHoverOut }) {
  return (
    <span
      role="button"
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={starGradientStyle}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient
              id="starGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "rgba(255,234,33,1)" }} />
              <stop offset="100%" style={{ stopColor: "rgba(141,33,255,1)" }} />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="url(#starGradient)"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={starGradientStyle}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient
              id="starGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "rgba(255,234,33,1)" }} />
              <stop offset="100%" style={{ stopColor: "rgba(141,33,255,1)" }} />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="none"
            stroke="url(#starGradient)"
          />
        </svg>
      )}
    </span>
  );
}

export default Star;
