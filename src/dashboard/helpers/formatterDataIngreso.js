export const formatearDataConsIngToTable = (dataFromBD) =>
  dataFromBD.map((data) => {
    return {
      id: data.id_consulta,
      id_paciente: data.id_paciente,
      pagos: formatearDataIngresosToTable(data.pagos),
      //

      fecha:
        data.fecha_consulta.replaceAll("-", "/") +
        " " +
        data.hora_consulta +
        ":00",
      paciente: data.Paciente,
      tipo_consulta: data.tipo_tipoConsul,
      motivo: data.mot_consulta,
      problema: data.probleAct_consulta,
      total: data.pagos.reduce((acc, pagoAct) => {
        return acc + parseFloat(pagoAct.monto);
      }, 0),
    };
  });

export const formatearDataIngresosToTable = (dataFromBD) =>
  dataFromBD.map((data) => {
    return {
      id: data.id_ingreso,
      //
      ingreso_por: data.pago_por,
      monto: parseFloat(data.monto),
      nota: data.desc_ingreso,
      fecha: data.fecha_create,
      fecha_upd: data.fecha_update,
    };
  });
