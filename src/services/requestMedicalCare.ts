import { readFile, writeFile } from "fs/promises";
import { DataRequest } from "../types/dataRequest";

const dataSource = "./data/requestForMedicalCare.txt";
export const getRequestMedicalCare = async () => {
 let list: string[] = [];
  try {
    const data = await readFile(dataSource, { encoding: "utf-8" });
    list = data.split("\n");
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
  }
  return list;
};

export const createRequestMedicalCare = async (dataRequest: DataRequest) => {
    let list = await getRequestMedicalCare();
    list.push(JSON.stringify(dataRequest));
    await writeFile(dataSource, list.join("\n"));
}

export const deleteRequestMedicalCare = async (id: string) => {

}