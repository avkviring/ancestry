import React, { useState } from "react";

import styles from "./styles.module.scss";

type Props<T, T2> = {
  front: T;
  back: T2;
};

const Flipcard = <T extends React.ReactNode, T2 extends React.ReactNode>({
  front,
  back,
}: Props<T, T2>) => {
  const [showBack, setShowBack] = useState(false);

  const handleClickOuter = () => {
    setShowBack((showBack) => !showBack);
  };

  return (
    <div className={styles.outer} onClick={handleClickOuter}>
      <div className={`${styles.inner} ${showBack ? styles.showBack : ""}`}>
        <div className={`${styles.card} ${styles.front}`}>{front}</div>
        <div className={`${styles.card} ${styles.back}`}>{back}</div>
      </div>
    </div>
  );
};

export default Flipcard;
