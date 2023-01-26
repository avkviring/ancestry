import yamlToJson from "js-yaml";
import { Person } from "../types/family";

const loadYaml = async (link: string, cb: (json: Person[]) => void) => {
  try {
    const response = await fetch(link);
    const yaml = await response.blob();
    let reader = new FileReader();
    reader.readAsText(yaml, "utf-8");

    reader.onload = function () {
      const json = yamlToJson.load(reader.result as string) as Person[];
      cb(json);
    };
  } catch (error) {
    alert("Ошибка при загрузке yaml файла");
    console.log("error on load yaml: ", error);
  }
};

export default loadYaml;
