import React, { useContext, useEffect, useState } from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { NodeContext } from "../App";
import { getCenterPosition } from "../helpers/utils";

type WrapperRef = React.MutableRefObject<ReactZoomPanPinchRef | null>;

const useHorizontalCenter = (wrapperRef: WrapperRef, INITIAL_SCALE: number) => {
  const { nodes, rootId } = useContext(NodeContext);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleCenterOnMounted = () => {
    if (!wrapperRef?.current?.instance?.mounted) return;

    const wrapperComponent = wrapperRef?.current?.instance.wrapperComponent;
    const contentComponent = wrapperRef?.current?.instance.contentComponent;

    if (!wrapperComponent || !contentComponent) return;

    const positionY = wrapperRef?.current?.state.positionY;

    const { scale, positionX } = getCenterPosition(
      INITIAL_SCALE,
      wrapperComponent,
      contentComponent
    );

    wrapperRef.current.instance.setTransformState(scale, positionX, positionY);
    setIsInitialized(true);
  };

  useEffect(() => {
    if (isInitialized || !wrapperRef?.current) return;

    const timer1 = setTimeout(() => {
      handleCenterOnMounted();
    }, 50);
    const timer2 = setTimeout(() => {
      handleCenterOnMounted();
    }, 100);
    const timer3 = setTimeout(() => {
      handleCenterOnMounted();
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [nodes, rootId, wrapperRef]);

  return null;
};

export default useHorizontalCenter;
