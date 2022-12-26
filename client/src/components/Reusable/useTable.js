import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TablePagination, TableSortLabel, TableContainer } from '@mui/material';

export default function useTable(records, headCells, filter) {
  const pageOptions = [10, 25, 50, 100] // Possible options for "records per page"
  const [page, setPage] = useState(0) // Current page of table
  const [recordsPerPage, setRecordsPerPage] = useState(pageOptions[page]) // Amount of records per page
  const [orderDirection, setOrderDirection] = useState() // Order direction (descending or ascending)
  const [orderColumn, setOrderColumn] = useState() // Column which is ordered
  
  const handlePageChange = (e, newPage) => { setPage(newPage) } // Sets new page when button for next page is clicked

  // Handle shown record when records per page has been changed
  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value, 10)) // Set records to selected amount
    setPage(0) // Show first page of table
  }

  // Custom Material UI Table Head component
  const TblHead = props => {
    const handleSort = headCellID => {
      const isAsc = orderColumn === headCellID && orderDirection === "asc"
      setOrderDirection(isAsc ? 'desc' : 'asc') // Set order direction (descending or ascending)
      setOrderColumn(headCellID) // Set column to order by
    }
    return (
      <TableHead>
        <TableRow >
          {
            headCells.map(headCell => (
              <TableCell 
                key= {headCell.id}
                sx= {{fontWeight:"bold"}}
                sortDirection={orderColumn === headCell.id ? orderDirection : false}>
                {headCell.disableSorting ? headCell.label :
                  <TableSortLabel
                    active= {orderColumn === headCell.id}
                    direction = {orderColumn === headCell.id ? orderDirection : 'asc'}
                    onClick={() =>{handleSort(headCell.id)}}
                  >
                    {headCell.label}
                  </TableSortLabel>
                }
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
      )
  }

  // Custom Material UI Table Container component
  const TblContainer = props => (
    <TableContainer>
      <Table sx= {{
          '& tbody tr:hover': {
              backgroundColor: '#fffbf2',
          },
          minWidth: 650
      }}>
          {props.children}
      </Table>
    </TableContainer>
  )

  // Custom Material UI Table Pagination component
  const TblPagination = () => (
    <TablePagination
      labelRowsPerPage={"Ierakstu skaits lapā"}
      component="div"    
      page={page}
      rowsPerPage={recordsPerPage}
      rowsPerPageOptions={pageOptions}
      count={records.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRecordsPerPageChange}
    />
  )

  // Sort records in ascending or descending order
  const stableSort = (arr, comparator) => {
      const stabilized = arr.map((item, index) => [item, index])
      stabilized.sort((a,b) => {
          const order = comparator(a[0], b[0])
          if(order !== 0) return order
          return a[1] - b[1]
      })
      return stabilized.map(item => item[0])
  }

  // Choose to order in ascending or descending order (from Material UI Table Sorting)
  const getComparator = (order, orderColumn) => {
    return order === 'desc'
      ? (x, y) => descendingComparator(x, y, orderColumn) // Descending order
      : (x, y) => -descendingComparator(x, y, orderColumn) // Ascending order
  }

  // Compares two values in descending order
  const descendingComparator = (x, y, orderColumn) => {
    if(y[orderColumn] < x[orderColumn]) return -1
    if(y[orderColumn] > x[orderColumn]) return 1
    return 0
  }

  // Final records after filtering and sorting
  const finalRecords = () => {
    return stableSort(filter.fn(records), getComparator(orderDirection, orderColumn))
      .slice(page * recordsPerPage, (page + 1) * recordsPerPage)
  }

  return {
    TblHead,
    TblContainer,
    TblPagination,
    finalRecords
  }
}
