import { useState } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDataStore, usePacienteStore } from "../../../hooks";
import { Link as RouterLink } from "react-router-dom";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
} from "@mui/icons-material";
import { CustomBasicTable } from "../FormInModal/CustomBasicTable";

//
//
//
//

export const RowTableCollapsible = ({
  row,
  indexRTC,
  selectedUser,
  withCheckbox,
  handleClick,
  filaSeleccionada,
  keys,
  dataOmitida,
  routePaciente,
  iconosEnFila,
  BtnInFila,
  handleOpenMenu,
  titleTablaCollapsed,
  TABLE_HEAD_COLLAPSED,
  propertyCollapsed,
}) => {
  //

  const { changeDataActiva } = useDataStore();
  const { changeDataPaciente } = usePacienteStore();
  const [open, setOpen] = useState(true);

  //
  return (
    <>
      {/* fila de la tabla */}
      <TableRow
        hover
        sx={{
          "& > *": {
            // border:"none !important",
            borderTop: indexRTC === 0 ? "" : "2px solid !important",
            borderTopColor: indexRTC === 0 ? "" : "grey !important",
          },
          "&.Mui-selected": {
            backgroundColor: "#E0DAEB !important",
          },
        }}
        tabIndex={-1}
        role="checkbox"
        selected={selectedUser}
        onClick={() => {
          changeDataActiva(row);

          if (keys.includes("nombre") || keys.includes("paciente")) {
            changeDataPaciente(row);
          }
        }}
      >
        {withCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={selectedUser}
              onChange={(event) => handleClick(event, filaSeleccionada)}
            />
          </TableCell>
        )}

        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUp sx={{ color: "primary.main" }} />
            ) : (
              <KeyboardArrowDown sx={{ color: "primary.main" }} />
            )}
          </IconButton>
        </TableCell>

        {/* celdas de los datos */}

        {keys.slice(dataOmitida).map((key, index) => {
          if (key === "paciente" || key === "nombre") {
            return (
              <TableCell key={`${row["id"]}${index}`} align="left">
                <Link
                  component={RouterLink}
                  to={routePaciente(row)}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: "secondary.main",
                      fontSize: "15px",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                  >
                    {row[key]}
                  </Typography>
                </Link>
              </TableCell>
            );
          } else {
            return (
              <TableCell
                sx={{
                  height: "10px",

                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                key={`${row["id"]}${index}`}
                align="left"
              >
                {row[key]}
              </TableCell>
            );
          }
        })}

        {iconosEnFila ? (
          <TableCell align="center">
            <Box display="flex" flexDirection="row" justifyContent="center">
              <BtnInFila infoRow={row} />
            </Box>
          </TableCell>
        ) : (
          <TableCell align="right">
            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {/* fila collapsed */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                fontSize="16px"
                fontStyle="italic"
                fontWeight="bold"
                color="blueSecondary.main"
                gutterBottom
                component="div"
              >
                {titleTablaCollapsed}
              </Typography>
              <CustomBasicTable
                table_head={TABLE_HEAD_COLLAPSED}
                table_data={row[propertyCollapsed]}
              />
              {/* <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD_COLLAPSED.map((element) => (
                      <TableCell key={element.id}>{element.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
