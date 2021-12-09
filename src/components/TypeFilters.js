import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

//TODO: make program and encounter type filter dependent
export default function TypeFilters({operationalModules, onValueChange}) {
    const [selectedSubjectTypes, setSelectedSubjectTypes] = React.useState([]);
    const [selectedPrograms, setSelectedPrograms] = React.useState([]);
    const [selectedEncounterTypes, setSelectedEncounterTypes] = React.useState([]);
    const {subjectTypes, programs, encounterTypes} = operationalModules;

    const formatOptions = (types) => _.map(types, ({id, name}) => ({
        label: name,
        value: id,
    }));

    const onSubjectTypeChange = newValues => {
        setSelectedSubjectTypes(newValues);
        onValueChange(prevValue => ({...prevValue, subjectTypeIds: _.map(newValues, ({value}) => value)}))
    };

    const onProgramChange = newValues => {
        setSelectedPrograms(newValues);
        onValueChange(prevValue => ({...prevValue, programIds: _.map(newValues, ({value}) => value)}))
    };

    const onEncounterTypeChange = newValues => {
        setSelectedEncounterTypes(newValues);
        onValueChange(prevValue => ({...prevValue, encounterTypeIds: _.map(newValues, ({value}) => value)}))
    };

    return (
        <Grid item container spacing={3} alignItems={'center'}>
            <Grid item>
                <FormControl fullWidth component="fieldset" sx={{width: 250}}>
                    <FormLabel component="legend" sx={{marginBottom: 1}}>{"Subject type"}</FormLabel>
                    <Select
                        isMulti
                        isSearchable
                        options={formatOptions(subjectTypes)}
                        onChange={onSubjectTypeChange}
                        value={selectedSubjectTypes}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl fullWidth component="fieldset" sx={{width: 250}}>
                    <FormLabel component="legend" sx={{marginBottom: 1}}>{"Programs"}</FormLabel>
                    <Select
                        isMulti
                        name="Programs"
                        isSearchable
                        options={formatOptions(programs)}
                        onChange={onProgramChange}
                        value={selectedPrograms}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl fullWidth component="fieldset" sx={{width: 250}}>
                    <FormLabel component="legend" sx={{marginBottom: 1}}>{"Encounter types"}</FormLabel>
                    <Select
                        isMulti
                        name="Encounter types"
                        isSearchable
                        options={formatOptions(encounterTypes)}
                        onChange={onEncounterTypeChange}
                        value={selectedEncounterTypes}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}
