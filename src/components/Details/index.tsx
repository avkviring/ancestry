import { useContext, useEffect, useState } from "react";
import Sheet from "react-modal-sheet";

import Accordion from "../Accordion";
import Biography from "../Biography";
import Slider from "../Slider";
import FamilyMember from "./FamilyMember";
import Document from "../Document";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "./styles.module.scss";
import { NodeContext } from "../../App";

const DetailsContent = () => {
  const { node, handleFindNode } = useContext(NodeContext);

  if (!node) return null;

  return (
    <>
      <div className={styles.details}>
        <div className={styles.details__container}>
          <Slider />
          <div className={styles.details__name}>
            {node.name} {node.surname}{" "}
            {node.surnameBefore ? `(${node.surnameBefore})` : null}
            <span></span>
          </div>
          <div className={styles.details__place}>{node.placebirth}</div>
          <div className={styles.details__date}>
            {`${node.birthday || ""} - ${node.deathday || ""}`}
            {/* {node.birthday
              ? node.birthday + " - " + (node.deathday ? node.deathday : "")
              : null} */}
          </div>
          <Biography key={node.id} />
          <Accordion
            title={"Родители"}
            isShowing={!!node.parents.length}
            key={JSON.stringify(node.parents) + node.id}
          >
            {node.parents.map((parent) =>
              parent.id ? (
                <FamilyMember
                  id={parent.id}
                  key={parent.id}
                  onClick={() => handleFindNode(parent.id)}
                />
              ) : null
            )}
          </Accordion>
          <Accordion
            title={"Дети"}
            isShowing={!!node.children.length}
            key={JSON.stringify(node.children) + node.id}
          >
            {node.children.map((child) =>
              child.id ? (
                <FamilyMember
                  id={child.id}
                  key={child.id}
                  onClick={() => handleFindNode(child.id)}
                />
              ) : null
            )}
          </Accordion>
          <Accordion
            title={"Документы"}
            isShowing={!!node.documents?.length}
            key={JSON.stringify(node.documents) + node.id}
          >
            {node.documents?.map((document, index) =>
              document ? <Document node={node} id={index} key={index} /> : null
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
};

type Props = {};

const Details = (props: Props) => {
  const { node, handleNode } = useContext(NodeContext);
  const { width } = useWindowDimensions();

  if (width > 650) {
    return <DetailsContent />;
  }

  return (
    <Sheet
      isOpen={!!node}
      onClose={() => handleNode(undefined)}
      snapPoints={[-100]}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag>
          <DetailsContent />
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={(e) => e.stopPropagation()} />
    </Sheet>
  );
};

export default Details;
