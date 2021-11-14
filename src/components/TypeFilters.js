import React, {Fragment} from 'react';
import Select from 'react-select';
import _ from 'lodash';

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
        <Fragment>
            <div style={{width: '300px'}}>
                <p>Subject type</p>
                <Select
                    isMulti
                    name="Subject types"
                    isSearchable
                    options={formatOptions(subjectTypes)}
                    onChange={onSubjectTypeChange}
                    value={selectedSubjectTypes}
                />
            </div>
            <div style={{width: '300px', marginLeft: '15px'}}>
                <p>Programs</p>
                <Select
                    isMulti
                    name="Programs"
                    isSearchable
                    options={formatOptions(programs)}
                    onChange={onProgramChange}
                    value={selectedPrograms}
                />
            </div>
            <div style={{width: '300px', marginLeft: '15px'}}>
                <p>Encounter types</p>
                <Select
                    isMulti
                    name="Encounter types"
                    isSearchable
                    options={formatOptions(encounterTypes)}
                    onChange={onEncounterTypeChange}
                    value={selectedEncounterTypes}
                />
            </div>
        </Fragment>
    )
}
