import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Relation } from "relatives-tree/lib/types";
import { NodeContext } from "../../App";

import { ExtendedNode } from "../../types/family";

import styles from "./styles.module.scss";

type Props = {
  node: ExtendedNode;
  style: CSSProperties;
  onClick: () => void;
  onSubClick: (rootId: string) => void;
};

const FamilyNode = ({ node, style, onClick, onSubClick }: Props) => {
  const { node: activeNode } = useContext(NodeContext);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!activeNode) return;
    if (activeNode?.id === node.id) {
      setIsActive(true);
      setIsHighlighted(true);
    } else {
      const { children, parents, siblings, spouses } = activeNode;
      const activeNodeFamily = [
        ...children,
        ...parents,
        ...siblings,
        ...spouses,
      ];

      const handleFindNode = (element: Relation) => element?.id === node.id;

      const isNodeFound = activeNodeFamily.some(handleFindNode);

      if (isNodeFound) {
        setIsHighlighted(true);
      } else if (isHighlighted) {
        setIsHighlighted(false);
      }

      if (isActive) {
        setIsActive(false);
      }
    }
  }, [activeNode]);

  return (
    <div
      className={`${styles.person__wrapper} ${isActive ? styles.active : ""} ${
        isHighlighted ? styles.highlighted : ""
      }`}
      style={style}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`${styles.person} ${styles[node.gender]}`}
      >
        <div className={styles.person__img}>
          {node.img ? <img src={node.img} alt="" /> : null}
        </div>
        <div className={styles.person__info}>
          <div className={styles.person__info_date}>
            {node.birthday} {node?.deathday ? "- " + node.deathday : ""}
          </div>
          <div className={styles.person__info_name}>{node.name}</div>
        </div>
      </div>
      {node.hasSubTree && (
        <div
          onClick={() => onSubClick(node.id)}
          className={`${styles.expand} ${styles[node?.gender]}`}
        />
      )}
    </div>
  );
};

export default React.memo(FamilyNode);
