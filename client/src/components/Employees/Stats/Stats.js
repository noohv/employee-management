import React, { useEffect } from 'react';
import { Container, Typography, Divider } from '@mui/material';
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
    {name: 'Cits', count: 3}
  ]

  return (
    <>
      <Typography sx={{mt:3, mb:3}} variant='h5'>Darbinieku pašreizējā statistika</Typography>
      <Divider/>
      <Container>
        <ResponsiveContainer minWidth={200} width="70%" aspect={2}>
          <PieChart>
            <Pie data={data} cx="70%" dataKey="count" outerRadius="70%"  >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fillOpacity={0.9} strokeWidth={2} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip wrapperStyle={{ outline: "none" }} />
            <Legend fontSize='9' iconSize={12} iconType='circle' verticalAlign='middle' align='right' layout='vertical' />
          </PieChart>
        </ResponsiveContainer>
        <Typography>
          {`Darbinieku skaits: ${employees.length}`}
        </Typography>
      </Container>
      <Divider sx={{mb:3}} />
    </>
  )
}
