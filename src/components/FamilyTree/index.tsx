import React, { useContext, useEffect, useState } from "react";
import calcTree from "relatives-tree";
import {
  ExtNode,
  Family,
  Node,
  Connector as FamilyConnector,
} from "relatives-tree/lib/types";

import { ExtendedNode } from "../../types/family";
import Connector from "../../components/Connector";
import FamilyNode from "../FamilyNode";

import styles from "./styles.module.scss";
import { NODE_HEIGHT, NODE_WIDTH } from "../../data/const";
import { getNodeStyle } from "../../helpers/utils";
import { NodeContext } from "../../App";

type TreeState = Readonly<{
  canvas: Readonly<{
    width: number;
    height: number;
  }>;
  families: readonly Family[];
  nodes: readonly ExtNode[];
  connectors: readonly FamilyConnector[];
}> | null;

type Props = {};

const width = NODE_WIDTH / 2;
const height = NODE_HEIGHT / 2;

const FamilyTree = (props: Props) => {
  const { handleNode, familyTree, handleNodes, rootId, handleChangeRootId } =
    useContext(NodeContext);

  const [tree, setTree] = useState<TreeState>(null);

  useEffect(() => {
    if (rootId && familyTree) {
      const tree = calcTree(familyTree as Node[], {
        rootId: rootId,
        placeholders: false,
      });

      setTree(tree);
      handleNodes(tree.nodes as ExtendedNode[]);
    }
  }, [rootId]);

  useEffect(() => {
    if (familyTree) {
      handleChangeRootId(familyTree[0].id);
    }
  }, [familyTree]);

  if (!tree || !rootId) return null;

  return (
    <div
      className={styles.tree}
      style={{
        position: "relative",
        width: tree.canvas.width * width,
        height: tree.canvas.height * height,
      }}
    >
      {tree?.connectors?.map((connector, idx) => (
        <Connector
          key={idx}
          connector={connector}
          width={width}
          height={height}
        />
      ))}
      {tree?.nodes?.map((node, index) => {
        return (
          <FamilyNode
            key={node.id}
            node={node as ExtendedNode}
            // isRoot={node.id === rootId}
            // isHover={node.id === hoverId}
            onClick={() => handleNode(node as ExtendedNode)}
            onSubClick={handleChangeRootId}
            style={getNodeStyle(node as ExtendedNode)}
          />
        );
      })}
    </div>
  );
};

export default FamilyTree;
