export const verifyPiezaDentalEmpty = (dataPieza) => {
  let dataEmpty = true;

  for (const value of Object.values(dataPieza).slice(2)) {
    if (value !== null) {
      dataEmpty = false;
      break;
    }
  }

  return dataEmpty;
};

export const formatearDataOdontograma = (odontograma) => {
  return {
    id_odontograma: odontograma.id_odontograma,
    id_consulta: odontograma.id_consulta,
    fecha_odontograma: odontograma.fecha_odontograma,
    piezas: odontograma.piezas.map((pieza) => {
      return {
        id: pieza.id_dent,
        numberTooth: pieza.num_dent,
        movilidad: pieza.mov_dent,
        recesion: pieza.rec_dent,
        oclusal: pieza.oclusal_dent,
        vestibular: pieza.vestibular_dent,
        mesial: pieza.mesial_dent,
        lingual: pieza.lingual_dent,
        distal: pieza.distal_dent,
      };
    }),
  };
};

export const formatearDataPiezaDentalToBD = (pieza) => {
  return {
    num_dent: pieza.numberTooth,
    mov_dent: pieza.movilidad,
    rec_dent: pieza.recesion,
    oclusal_dent: pieza.oclusal,
    vestibular_dent: pieza.vestibular,
    mesial_dent: pieza.mesial,
    lingual_dent: pieza.lingual,
    distal_dent: pieza.distal,
  };
};
