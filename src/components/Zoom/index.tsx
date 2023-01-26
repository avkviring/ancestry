import React from "react";
import {
  ReactZoomPanPinchHandlers,
  ReactZoomPanPinchState,
} from "react-zoom-pan-pinch";

import zoomInIcon from "../../assets/icons/zoom-in.svg";
import zoomOutIcon from "../../assets/icons/zoom-out.svg";

import styles from "./styles.module.scss";

type Props = {
  state: ReactZoomPanPinchState;
  zoomIn: ReactZoomPanPinchHandlers["zoomIn"];
  zoomOut: ReactZoomPanPinchHandlers["zoomOut"];
};

const Zoom = ({ state, zoomIn, zoomOut }: Props) => {
  return (
    <div className={styles.tools}>
      <div className={styles.tools_zoom}>{Math.round(state.scale * 100)}%</div>
      <button className={styles.tools_item} onClick={() => zoomIn(0.4)}>
        <img src={zoomInIcon} alt="" />
      </button>
      <button className={styles.tools_item} onClick={() => zoomOut(0.4)}>
        <img src={zoomOutIcon} alt="" />
      </button>
    </div>
  );
};

export default Zoom;
