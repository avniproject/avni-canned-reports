import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";


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
