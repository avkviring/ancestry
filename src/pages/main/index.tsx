import React, { useContext, useEffect } from "react";
import Header from "../../components/Header";
import Ancestry from "../../components/Ancestry";
import Details from "../../components/Details";
import loadYaml from "../../helpers/loadYaml";
import { NodeContext } from "../../App";

const LINK = "./files/rurikovichi.yaml";

const Main = () => {
  const { handleFamilyTree } = useContext(NodeContext);

  useEffect(() => {
    loadYaml(LINK, (json) => {
      handleFamilyTree(json);
    });
  }, []);

  return (
    <>
      <Header />
      <Ancestry />
      <Details />
    </>
  );
};

export default Main;
