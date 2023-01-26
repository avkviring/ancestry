import { useState, useEffect } from "react";
import { throttle } from "../helpers/utils";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    const throttledHandleResize = throttle(handleResize, 200);

    window.addEventListener("resize", throttledHandleResize);
    return () => window.removeEventListener("resize", throttledHandleResize);
  }, []);

  return windowDimensions;
}
