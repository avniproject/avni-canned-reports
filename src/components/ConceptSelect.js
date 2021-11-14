import React, {useState} from 'react';
import Autosuggest from 'react-autosuggest';
import api from "../api";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const useStyles = theme => ({
    root: {
        height: 250,
        flexGrow: 1
    },
    container: {
        position: "relative",
        marginTop: 10,
        width: "100%"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        overflow: "auto",
        maxHeight: "400%"
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    }
});

const renderInputComponent = inputProps => {
    const {
        classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input
                }
            }}
            {...other}
        />
    );
};

const renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text.name} style={{fontWeight: part.highlight ? 500 : 400}}>
            {part.text.name + " (" + part.text.dataType + ")"}
          </span>
                ))}
            </div>
        </MenuItem>
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const ConceptSelect = ({onSelect}) => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onSuggestionsFetchRequested = ({value}) => {
        api.searchConcepts(`name=${value}&dataType=Coded`).then(setSuggestions);
    };

    const onChange = (event, stuff) => {
        setValue(stuff.newValue);
    };

    const onSuggestionSelected = (event, { suggestion, suggestionValue}) => {
        setValue(suggestionValue);
        onSelect(suggestion);
    };

    const clearSuggestions = () => setSuggestions([]);

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={clearSuggestions}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
                classes,
                required: true,
                label: 'Concept',
                disabled: false,
                autoFocus: true,
                placeholder: 'Concept',
                value,
                onChange
            }}
            renderInputComponent={renderInputComponent}
            theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion
            }}
            renderSuggestionsContainer={options => (
                <Paper {...options.containerProps} square>
                    {options.children}
                </Paper>
            )}
        />
    );
};

export default ConceptSelect;
