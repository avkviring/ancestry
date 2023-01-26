import React, { useEffect, useState } from "react";
import { ExtendedNode } from "../types/family";

type NewNodeData = {
  isWaiting: boolean;
  parentId: string | null;
};

type Props = {
  nodes: ExtendedNode[] | null;
  handleChangeRootId: (rootId: string) => void;
  handleNode: (node?: ExtendedNode | undefined) => void;
};

const useFindNode = ({ nodes, handleChangeRootId, handleNode }: Props) => {
  const [newNodeData, setNewNodeData] = useState<NewNodeData>({
    isWaiting: false,
    parentId: null,
  });

  const handleFindNode = (parentId: string) => {
    const findedNode = nodes?.find((node) => node.id === parentId);

    if (findedNode) {
      handleNode(findedNode);
      setNewNodeData({ isWaiting: false, parentId: null });
    } else {
      handleChangeRootId(parentId);
      setNewNodeData({ isWaiting: true, parentId });
    }
  };

  useEffect(() => {
    if (newNodeData.isWaiting && nodes) {
      newNodeData.parentId && handleFindNode(newNodeData.parentId);
    }
  }, [nodes]);

  return { handleFindNode };
};

export default useFindNode;
