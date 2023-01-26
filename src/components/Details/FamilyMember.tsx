import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../../App";

import { Person } from "../../types/family";

import styles from "./styles.module.scss";

type Props = {
  id: string;
  onClick: () => void;
};

const FamilyMember = ({ id, onClick }: Props) => {
  const { familyTree } = useContext(NodeContext);
  const [node, setNode] = useState<Person | null>(null);

  useEffect(() => {
    if (familyTree) {
      const member = familyTree.find((item) => item.id === id);

      if (!member) return;

      setNode(member);
    }
  }, [familyTree, id]);

  return (
    <div
      className={`${styles.member} ${node ? styles[node.gender] : ""}`}
      onClick={onClick}
    >
      <div className={styles.member__img}>
        {node?.img ? <img src={node?.img} alt="" /> : null}
      </div>
      <div className={styles.member__info}>
        <div className={styles.member__info_name}>
          {node?.name} {node?.surname}
        </div>
        <div className={styles.member__info_date}>
          {node?.birthday} - {node?.deathday}
        </div>
      </div>
    </div>
  );
};

export default FamilyMember;
