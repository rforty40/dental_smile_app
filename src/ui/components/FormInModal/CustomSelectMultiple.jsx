import { MenuItem, Select, Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CustomSelectMultiple = ({
  lblText = "",
  altura,
  ancho,
  listOptions = [],
  fnGetStyles,
  ...props
}) => {
  return (
    <div>
      {lblText !== "" && (
        <Typography fontSize="12px" fontWeight="bold" color="primary.main">
          {lblText}
        </Typography>
      )}
      <Select
        displayEmpty
        {...props}
        multiple
        MenuProps={MenuProps}
        sx={{
          margin: "2px",
          width: ancho,
          height: altura,
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",

          fontStyle: "italic",
          fontWeight: "bold",

          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #602A90",
          },

          "& .MuiInputBase-root > .MuiSvgIcon-root": {
            color: "#602A90 !important",
          },
          "&:hover fieldset": {
            borderColor: "#602A90 !important ",
          },
          svg: {
            color: "secondary.main",
          },
        }}
      >
        {listOptions.map((option) => (
          <MenuItem key={option} value={option} style={fnGetStyles(option)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
