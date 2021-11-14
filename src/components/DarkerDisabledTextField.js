import {withStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";

const DarkerDisabledTextField = withStyles({
    root: {
        marginRight: 8,
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000"
        },
        marginTop: 0,
        marginBottom: 0
    }
})(TextField);

export default DarkerDisabledTextField;
