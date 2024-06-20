import React from "react";

interface CampoPropos {
  id: number;
  value?: string;
  onClick: (id: number) => void | undefined;
  isClickable: boolean;
}

export const Campo: React.FC<CampoPropos> = ({
  id,
  value,
  onClick,
  isClickable,
}) => {
  return (
    <div
      className={`border-solid border-2 border-white text-white m-1 flex justify-center items-center text-8xl ${
        isClickable ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      style={{ width: "150px", height: "150px" }}
      onClick={isClickable ? () => onClick(id) : undefined}
    >
      {value}
    </div>
  );
};

export default Campo;
