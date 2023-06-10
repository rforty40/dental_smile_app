import dentalSmileApi from "./dentalSmileApi";

export const getConsultas = async (id_pac, filtro, param1, param2) =>
  await dentalSmileApi.get(
    `/pacientes/${id_pac}/historial/${filtro}/${param1}/${param2}`
  );

export const getConsultaById = async (id_cons) =>
  await dentalSmileApi.get(`/consultas/${id_cons}/detalle/detalle`);

export const createConsulta = async (id_pac, consData) =>
  await dentalSmileApi.post(`/pacientes/${id_pac}/consultas/create`, consData);

export const updateConsulta = async (idCons, consData) =>
  await dentalSmileApi.put(`/consultas/${idCons}/update`, consData);

export const deleteConsulta = async (idCons) =>
  await dentalSmileApi.delete(`/consultas/${idCons}/delete`);

//Signos vitales

export const getSignosVitales = async (id_cons) =>
  await dentalSmileApi.get(`/consultas/${id_cons}/detalle/signosVitales`);

export const createSignosVitales = async (id_cons, signVit) =>
  await dentalSmileApi.post(
    `/consulta/${id_cons}/signos_vitales/create`,
    signVit
  );

export const updateSignosVitales = async (id_cons, id_sign, signVit) =>
  await dentalSmileApi.put(
    `/consulta/${id_cons}/signos_vitales/update/${id_sign}`,
    signVit
  );

//

// Examenes estomatognaticos
export const getExamenes = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/examenes`);

export const createExamen = async (id_cons, examen) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/examen_esto/create`, examen);

export const updateExamen = async (id_exa, examen) =>
  await dentalSmileApi.put(`/examen_esto/update/${id_exa}`, examen);

export const deleteExamen = async (id_exa) =>
  await dentalSmileApi.delete(`/examen_esto/delete/${id_exa}`);

//

//Enfermedades CIE
export const getEnfermedadesCIE = async () =>
  await dentalSmileApi.get(`/enfermedades/_`);

//

//planes
export const getPlanes = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/planes`);

export const createPlan = async (id_cons, plan) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/planes/create`, plan);

export const updatePlan = async (id_plan, plan) =>
  await dentalSmileApi.put(`/planes/update/${id_plan}`, plan);

export const deletePlan = async (id_plan) =>
  await dentalSmileApi.delete(`/planes/delete/${id_plan}`);

//

//diagnosticos
export const getDiagnosticos = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/diagnosticos`);

export const createDiagnostico = async (id_cons, diag) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/diagnosticos/create`, diag);

export const updateDiagnostico = async (id_diag, diag) =>
  await dentalSmileApi.put(`/diagnosticos/update/${id_diag}`, diag);

export const deleteDiagnostico = async (id_diag) =>
  await dentalSmileApi.delete(`/diagnosticos/delete/${id_diag}`);
