import MaterialTable, {MTableToolbar} from "@material-table/core";
import React from "react";
import DateFilterMessage from "./DateFilterMessage";
import {includes} from 'lodash';

const DataTable = ({title, columns, fetchData, onResolve, options, filterQueryString, dateFilterDisabled, ...props}) => {
    const queryHasDate = includes(filterQueryString, 'startDate');
    return (
        <MaterialTable
            title={title}
            options={{
                search: false,
                sorting: false,
                paging: false,
                maxBodyHeight: 300,
                ...options
            }}
            columns={columns}
            data={query =>
                new Promise((resolve, reject) => {
                    let queryString = "";
                    if (options && options.paging) {
                        queryString = "size=" + query.pageSize;
                        queryString += "&page=" + query.page;
                    }
                    fetchData(filterQueryString, queryString)
                        .then(data => {
                            resolve(onResolve(data))
                        })
                })
            }
            components={{
                Toolbar: props => (
                    <div>
                        {dateFilterDisabled && queryHasDate ? <DateFilterMessage/> : null}
                        <MTableToolbar {...props} />
                    </div>
                ),
            }}
            {...props}
        />
    )
};

export default DataTable
