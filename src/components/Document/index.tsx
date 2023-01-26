import { useEffect, useState } from "react";
import { AdditionalPerson } from "../../types/family";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  node: AdditionalPerson;
};

const Document = ({ id, node }: Props) => {
  const [weight, steWeiht] = useState<string>();
  const [type, setType] = useState<string>();

  useEffect(() => {
    if (node && node.documents && node?.documents[id].url) {
      const url = node?.documents[id].url;
      const req = new XMLHttpRequest();

      if (url) {
        req.open("GET", url, false);
        req.send();
        let weight = req.getResponseHeader("content-length");

        if (typeof weight === "string") {
          if (+weight < 1024) {
            weight = weight + "b";
          } else {
            if (+weight / 1024 < 1024) {
              weight = Math.round(+weight / 1024) + "Kb";
            } else {
              weight = Math.round(+weight / 1024 / 1024) + "Mb";
            }
          }

          steWeiht(weight);
        }
      }
    }
  }, [node, id]);

  useEffect(() => {
    if (node && node.documents && node?.documents[id].url) {
      const url = node?.documents[id].url;

      if (url) {
        setType(url.split(".").pop());
      }
    }
  }, [node, id]);

  if (!node.documents?.length) return null;

  return (
    <a
      href={node?.documents[id].url}
      download={node?.documents[id].description}
      className={styles.document}
    >
      <div className={styles.document__img}>
        {node?.img ? <img src={node?.documents[id].image} alt="" /> : null}
      </div>
      <div className={styles.document__info}>
        <div className={styles.document__info_name}>
          {node?.documents[id].description}
        </div>
        <div className={styles.document__info_details}>
          {type}
          {weight ? ", " + weight : null}
        </div>
      </div>
    </a>
  );
};

export default Document;
