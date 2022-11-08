import React, { useEffect } from 'react';
import { Container, Card, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';


export default function Stats({ employees }) {
  
  const current = new Date().toISOString()
  const COLORS = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];

  const activeEmp = () => { return employees.filter((item) => !item.absences.some(i => i.startDate <= current && i.endDate >= current)) }
  const holidayLeaveEmp = () => { return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'holiday'))))) }
  const sickLeaveEmp = () => { return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'sick'))))) }

  const data = [
    {name: 'Aktīvi', count: activeEmp().length},
    {name: 'Atvaļinājumā', count: holidayLeaveEmp().length},
    {name: 'Slimības lapa', count: sickLeaveEmp().length},
    {name: 'Cits', count: 0}
  ]

  return (
    <>
      <Container sx={{display:'flex', justifyContent:'space-around'}}>
        <Card variant='outlined' sx={{width: '75%'}}>
          <Typography>Darbinieku pašreizējā statistika</Typography>
          <ResponsiveContainer width="99%" aspect={3}>
            <PieChart>
              <Pie data={data} dataKey="count" outerRadius="70%">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ outline: "none" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <Typography>
            {`${holidayLeaveEmp().length} / ${employees.length}`}
          </Typography>
        </Card>
      </Container>
    </>
  )
}
