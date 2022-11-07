import React from 'react'
import { Container } from '@mui/material'

export default function Stats({ employees }) {
  const activeCount = () => {
    const current = new Date().toISOString()
    console.log(current)
    return employees.filter((item) => item.absences.some(i => i.startDate < current && i.endDate > current)).length
  }

  console.log(activeCount())

  return (
    <>
      <Container>
        {activeCount()}
      </Container>
    </>
  )
}
