import React, { useContext, useEffect, useRef, useState } from "react";
import { NodeContext } from "../../App";

import styles from "./styles.module.scss";

type Props = {};

const Biography = (props: Props) => {
  const { node } = useContext(NodeContext);
  const [isActive, setIsActive] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const refComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refHeight = refComponent.current?.scrollHeight;

    if (!refHeight) return;

    setHeight(refHeight);
  }, [refComponent, isActive, node]);

  if (!node?.biography) return null;

  return (
    <>
      <div
        className={styles.details__biography_text}
        ref={refComponent}
        style={isActive ? { maxHeight: `${height}px` } : {}}
      >
        {node.biography}
      </div>
      {height && height > 115 ? (
        <button
          className={styles.details__biography_more}
          onClick={() => {
            setIsActive((isActive) => !isActive);
          }}
        >
          {isActive ? "свернуть" : "раскрыть"}
        </button>
      ) : null}
    </>
  );
};

export default Biography;
