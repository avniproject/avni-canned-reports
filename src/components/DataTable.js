import MaterialTable from "@material-table/core";
import React from "react";

const DataTable = ({title, columns, fetchData, onResolve, options}) => {
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
                    fetchData(queryString)
                        .then(data => {
                            resolve(onResolve(data))
                        })
                })
            }
        />
    )
};

export default DataTable
