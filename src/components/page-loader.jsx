import React from "react";
import { RotatingLines } from 'react-loader-spinner'

export const PageLoader = () => {

  return (
    <div className="loader">
            <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="blue"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
  );
};