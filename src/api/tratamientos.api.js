import dentalSmileApi from "./dentalSmileApi";

export const getTratamientos = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/tratamientos`);

export const createTratamiento = async (id_cons, tratamData) =>
  await dentalSmileApi.post(
    `/consulta/${id_cons}/tratamiento/create`,
    tratamData
  );

export const updateTratamiento = async (id_tra, tratamData) =>
  await dentalSmileApi.put(`/tratamiento/update/${id_tra}`, tratamData);

export const deleteTratamiento = async (id_tra) =>
  await dentalSmileApi.delete(`/tratamiento/delete/${id_tra}`);
