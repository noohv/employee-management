import React from 'react';
import { Container, Card, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';


export default function Stats({ employees }) {
  const current = new Date().toISOString()
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const activeEmp = () => {
    return employees.filter((item) => !item.absences.some(i => i.startDate <= current && i.endDate >= current))
  }

  const holidayLeaveEmp = () => {
    return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'holiday')))))
  }

  const sickLeaveEmp = () => {
    return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'sick')))))
  }

  const data = [
    {name: 'Aktīvi', count: activeEmp().length},
    {name: 'Slīmība', count: holidayLeaveEmp().length},
    {name: 'Atvaļinājumā', count: sickLeaveEmp().length}
  ]


  return (
    <>
      <Container sx={{display:'flex', justifyContent:'space-around'}}>
        {/* <Card variant='outlined'>
          <Typography>Aktīvi</Typography>
          <Typography>
            {`${activeEmp().length} / ${employees.length}`}
          </Typography>
        </Card>
        <Card variant='outlined'>
          <Typography>Slimības lapa</Typography>
          <Typography>
          {`${sickLeaveEmp().length} / ${employees.length}`}
          </Typography>
        </Card>
        <Card variant='outlined'>
          <Typography>Atvaļinājumi</Typography>
          <Typography>
            {`${holidayLeaveEmp().length} / ${employees.length}`}
          </Typography>
        </Card> */}
        
      <PieChart width={200} height={200}>
        <Pie data={data} dataKey="count" outerRadius={50} fill="green">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      </Container>
    </>
  )
}
