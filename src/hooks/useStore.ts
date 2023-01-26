import React, { useState } from "react";
import { ExtendedNode, Person } from "../types/family";
import useFindNode from "./useFindNode";

export class DefaultStore {
  node = null;
  handleNode = () => {};
  familyTree = null;
  handleFamilyTree = () => {};
  nodes = null;
  handleNodes = () => {};
  rootId = null;
  handleChangeRootId = () => {};
  handleFindNode = () => {};
}

const useStore = () => {
  const [node, setNode] = useState<ExtendedNode | null>(null);
  const [nodes, setNodes] = useState<ExtendedNode[] | null>(null);
  const [familyTree, setFamilyTree] = useState<Person[] | null>(null);
  const [rootId, setRootId] = useState<string | null>(null);
  const { handleFindNode } = useFindNode({
    nodes,
    handleChangeRootId,
    handleNode,
  });

  const handleNodes = (nodes: ExtendedNode[]) => {
    if (nodes.length) {
      setNodes(nodes);
    } else {
      setNodes(null);
    }
  };

  function handleChangeRootId(rootId: string) {
    setRootId(rootId);
  }

  function handleNode(node?: ExtendedNode) {
    if (!node) return setNode(null);

    setNode(node);
  }

  function handleFamilyTree(familyTree: Person[] | null) {
    setFamilyTree(familyTree);
  }

  return {
    node,
    handleNode,
    familyTree,
    handleFamilyTree,
    nodes,
    handleNodes,
    rootId,
    handleChangeRootId,
    handleFindNode,
  };
};

export default useStore;
