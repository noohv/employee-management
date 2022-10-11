import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Employee from "./Employee/Employee";

const Employees = () => {
    const employees = useSelector((state) => state.employees);

    const [pageSize, setPageSize] = React.useState(10);

    const columns = [
        {field: 'firstName', headerName: 'Vārds'},
        {field: 'lastName', headerName: 'Uzvārds'},
        {field: 'startDate', headerName: 'Sākuma Datums'}
    ]



    return (
        !employees.length ? <CircularProgress /> : (
            <DataGrid
                rows={employees}
                columns={columns}
                checkboxSelection
                autoHeight
                getRowId={(row) => row._id }
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 25, 50, 100]}
                pagination
            />
        )
    );
}

export default Employees;