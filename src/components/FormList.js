import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FormItem = (form) => {
    return (<MenuItem value={form.uuid} key={form.uuid}>{form.name}</MenuItem>)
};

const FormList = ({forms, form, onFormSelect}) => {
    return (
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
            <Select
                autoWidth
                label={"Form"}
                id="forms"
                value={form}
                onChange={(event) => {
                    onFormSelect(event.target.value)
                }}>
                {forms.map((form) => FormItem(form))}
            </Select>
        </FormControl>
    )
};

export default FormList;
