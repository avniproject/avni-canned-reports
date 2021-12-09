//This component is copied form avni-webapp

import React from "react";
import _ from "lodash";
import Select from "react-select";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {locationNameRenderer} from "../utils";
import apis from "../api";

const AddressLevelsByType = ({onValueChange}) => {
    const [data, setData] = React.useState([]);
    const [selectedAddresses, setSelectedAddresses] = React.useState([]);
    const [openMenu, setOpenMenu] = React.useState(false);

    React.useEffect(() => {
        apis.fetchLocations().then(data => setData(data));
    }, []);


    const createListOptions = () =>
        _.map(data, location => ({
            label: location.name,
            value: location.id,
            optionLabel: locationNameRenderer(location)
        }));

    const onChange = (event) => {
      setSelectedAddresses(event);
        const ids = _.map(event, ({value}) => value);
        onValueChange(prevValue => ({...prevValue, locationIds: ids}))
    };

    const onInputChange = value => {
        let menuIsOpen = false;
        if (value) {
            menuIsOpen = true;
        }
        setOpenMenu(menuIsOpen);
    };

    return (
            <FormControl fullWidth component="fieldset" sx={{width: 250}}>
                <FormLabel component="legend" sx={{marginBottom: 1}}>{"Address"}</FormLabel>
                <Select
                    isMulti
                    isSearchable
                    placeholder={`Start typing and select`}
                    value={selectedAddresses}
                    options={createListOptions()}
                    onChange={onChange}
                    onInputChange={onInputChange}
                    menuIsOpen={openMenu}
                    components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
                    formatOptionLabel={({optionLabel}) => <div>{optionLabel}</div>}
                />
            </FormControl>
    );
};

export default AddressLevelsByType;
