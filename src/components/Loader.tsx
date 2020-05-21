import * as React from "react";
import Lottie from "react-lottie";

import * as loaderData from "../assets/lottie/loader.json";

const Loader = () => {
  return (
    <div id="loader">
      <Lottie
        options={{ animationData: loaderData }}
        height={"50%"}
        width={"50%"}
      />
    </div>
  );
};

export default Loader;
