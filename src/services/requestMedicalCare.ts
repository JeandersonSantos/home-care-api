import { DataRequest } from "../types/dataRequest";
import { pool } from "../database/connection";

export const getRequestMedicalCare = async () => {
  try {
    const result = await pool.query("SELECT * FROM request_medical");
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar solicitações médicas:", error);
    throw error;
  }
};

export const createRequestMedicalCare = async (dataRequest: DataRequest) => {
  const {
    name,
    phone,
    street,
    number,
    neighborhood,
    city,
  } = dataRequest;
  try {
    const query = `
      INSERT INTO request_medical (
        name,
        phone,
        street,
        number,
        neighborhood,
        city
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      name,
      phone,
      street,
      number,
      neighborhood,
      city,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar solicitação médica:", error);
    throw error;
  }
};

export const updateRequestMedicalCare = async (
  id: string,
  dataRequest: Partial<DataRequest>
) => {
  try {
    // Verifica se há campos para atualizar
    const fields = Object.keys(dataRequest);
    if (fields.length === 0) {
      throw new Error("Nenhum campo fornecido para atualização");
    }

    // Constrói a query dinamicamente
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    const values = [...fields.map((field) => (dataRequest as any)[field]), id];

    const query = `
      UPDATE request_medical
      SET ${setClause}
      WHERE id = $${fields.length + 1}
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao atualizar solicitação médica:", error);
    throw error;
  }
};

export const deleteRequestMedicalCare = async (id: string) => {
  try {
    const query = `
      DELETE FROM request_medical
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao atualizar solicitação médica:", error);
    throw error;
  }
};
