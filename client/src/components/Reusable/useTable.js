import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TablePagination, TableSortLabel, TableContainer } from '@mui/material';

export default function useTable(records, headCells, filter) {
  const pages = [10,25,50,100] // Possible options for "records per page"
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [orderBy, setOrderBy] = useState()
  const [order, setOrder] = useState()
  
  const TblContainer = props => (
    <TableContainer>
      <Table sx={{
          '& tbody tr:hover': {
              backgroundColor: '#fffbf2',
          },
          minWidth: 650
      }}>
          {props.children}
      </Table>
    </TableContainer>
  )

  const TblHead = (props) => {
    const handleSort = cellid => {
      const isAsc = orderBy === cellid && order === "asc"
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellid)
    }
    return (
      <TableHead>
        <TableRow >
          {
            headCells.map(headCell => (
              <TableCell 
                key={headCell.id}
                sx={{fontWeight:"bold"}}
                sortDirection={orderBy === headCell.id ? order : false}>
                {headCell.disableSorting ? headCell.label :
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction = {orderBy === headCell.id ? order : 'asc'}
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

  const handlePageChange = (e, newPage) => { setPage(newPage) }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value,10))
    setPage(0)
  }

  const TblPagination = () => (
    <TablePagination
      labelRowsPerPage={"Ierakstu skaits lapā"}
      component="div"    
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
      count={records.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange = {handleRowsPerPageChange}
    />
  )

  // Sort records in ascending or descending order
  const stableSort = (arr, comparator) => {
      const stabilizedThis = arr.map((el, index) => [el, index])
      stabilizedThis.sort((a,b) => {
          const order = comparator(a[0], b[0])
          if(order !== 0) return order
          return a[1] - b[1]
      })
      return stabilizedThis.map((el) => el[0])
  }

  // Choose to order in ascending or descending order
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  // Compares two values in descending order
  const descendingComparator = (a, b, orderBy) => {
    if(b[orderBy] < a[orderBy]) return -1
    if(b[orderBy] > a[orderBy]) return 1
    return 0
  }

  // Final records after filtering and sorting
  const finalRecords = () => {
    return stableSort(filter.fn(records), getComparator(order,orderBy))
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  return {
    TblContainer,
    TblHead,
    TblPagination,
    finalRecords
  }
}
