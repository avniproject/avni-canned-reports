import React, {useState, useEffect} from 'react';
import apis from "../api";
import {map} from 'lodash';
import FormLabel from "@mui/material/FormLabel";
import Select from "react-select";
import FormControl from "@mui/material/FormControl";

const UserGroupFilter = ({onValueChange}) => {
    const [data, setData] = useState([]);
    const [group, setGroup] = useState();

    useEffect(() => {
        apis.fetchUserGroups().then(data => {
            setData(map(data, ({id, name}) => ({label: name, value: id})))
        })
    }, []);

    const onChange = (event) => {
        setGroup(event);
        onValueChange(prevValue => ({...prevValue, groupId: event.value}))
    };

    return (
        <FormControl fullWidth component="fieldset" sx={{width: 250}}>
            <FormLabel component="legend" sx={{marginBottom: 1}}>{"User group"}</FormLabel>
            <Select
                isSearchable
                options={data}
                onChange={onChange}
                value={group}
            />
        </FormControl>
    )
};

export default UserGroupFilter
