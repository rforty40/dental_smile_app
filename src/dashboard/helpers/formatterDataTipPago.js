export const formatearDataTipPagoToTable = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      // id_proced: data.id_proced,
      // id_tipoConsul: data.id_tipoConsul,
      id: data.id_tipPago,
      //
      tipo_de_pago: data.desc_tipPago,
      precio: parseFloat(data.prec_tipPago),
    };
  });
};

export const formatearDataTipPagoToBD = (dataTipPago) => {
  return {
    // id_tipoConsul:
    //   dataTipPago.id_tipoConsul !== undefined
    //     ? dataTipPago.id_tipoConsul
    //     : null,
    // id_proced:
    //   dataTipPago.id_proced !== undefined ? dataTipPago.id_proced : null,
    desc_tipPago: dataTipPago.tipo_de_pago,
    prec_tipPago: parseFloat(dataTipPago.precio),
  };
};

const columnEquivalent = {
  desc_tipPago: "Tipo de pago",
  prec_tipPago: "Precio",
};

export const comprobarErrorTipPago = (typeError) => {
  let msgError = "";
  if (
    typeError.includes("Data too long for column") ||
    typeError.includes("Out of range value")
  ) {
    let campo = "";
    for (const key in columnEquivalent) {
      if (typeError.includes(key)) {
        campo = columnEquivalent[key];
      }
    }
    msgError = "Se excedió el límite en el campo " + campo;
  } else {
    msgError =
      "Error: " +
      typeError +
      ". Para mas información contactese con el administrador";
  }

  return msgError;
};
