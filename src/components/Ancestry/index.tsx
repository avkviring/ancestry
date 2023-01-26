import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { NodeContext } from "../../App";
import useHorizontalCenter from "../../hooks/useHorizontalCenter";
import FamilyTree from "../FamilyTree";
import Zoom from "../Zoom";

import styles from "./styles.module.scss";

const AncestryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { handleNode, node } = useContext(NodeContext);

  return (
    <div
      onClick={() => {
        if (!node) return;
        handleNode(undefined);
      }}
    >
      {children}
    </div>
  );
};

const INITIAL_SCALE = 1;

type Props = {};

const Ancestry = (props: Props) => {
  const { node } = useContext(NodeContext);
  const wrapperRef = useRef<ReactZoomPanPinchRef | null>(null);

  useHorizontalCenter(wrapperRef, INITIAL_SCALE);

  return (
    <AncestryWrapper>
      <TransformWrapper
        ref={wrapperRef}
        initialScale={INITIAL_SCALE}
        minScale={0.5}
        centerZoomedOut={true}
        wheel={{ step: 0.03 }}
        doubleClick={{ step: 0.6 }}
      >
        {({ zoomIn, zoomOut, state, setTransform, ...rest }) => {
          return (
            <>
              <Zoom state={state} zoomIn={zoomIn} zoomOut={zoomOut} />
              <TransformComponent wrapperClass={`${styles.ancestry}`}>
                <FamilyTree />
              </TransformComponent>
            </>
          );
        }}
      </TransformWrapper>
    </AncestryWrapper>
  );
};

export default Ancestry;
