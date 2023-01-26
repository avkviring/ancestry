import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { NodeContext } from "../../App";

import arrow from "../../icons/accordion-arrow.svg";

import styles from "./styles.module.scss";

type Props = {
  children: ReactNode;
  title: string;
  isShowing: boolean;
};

const Accordion = ({ children, title, isShowing }: Props) => {
  const { node } = useContext(NodeContext);
  const [isActive, setIsActive] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const refComponent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refComponent) return;
    const refHeight = refComponent.current?.scrollHeight;

    if (!refHeight) return;

    setHeight(refHeight);
  }, [refComponent, isActive, title, node]);

  //   useEffect(() => {
  //     setIsActive(false);
  //   }, [node]);

  if (!children || !isShowing) return null;

  return (
    <>
      <button
        className={`${styles.accordion} ${isActive ? styles.active : ""}`}
        onClick={() => {
          setIsActive((isActive) => !isActive);
        }}
      >
        {title}
        <img className={styles.accordion__icon} src={arrow} alt="" />
      </button>
      <div
        className={`${styles.panel} ${isActive ? styles.active : ""}`}
        ref={refComponent}
        style={isActive ? { maxHeight: `${height}px` } : {}}
      >
        {children}
      </div>
    </>
  );
};

export default Accordion;
