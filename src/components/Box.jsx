import React, { useState } from "react";

function Box({ children }) {
  const [isopen, setIsopen] = useState(true);


  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsopen((open) => !open)}>
        {isopen ? "–" : "+"}
      </button>

      {isopen && children}
    </div>
  );
}

export default Box;
