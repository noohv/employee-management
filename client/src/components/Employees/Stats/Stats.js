import React, { useEffect } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import { PieChart, Pie, Sector, Tooltip, Legend, Cell, ResponsiveContainer, Label } from 'recharts';


export default function Stats({ employees }) {
  
  const current = new Date().toISOString()
  const COLORS = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];

  const activeEmp = () => { return employees.filter((item) => !item.absences.some(i => i.startDate <= current && i.endDate >= current)) }
  const holidayLeaveEmp = () => { return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'holiday'))))) }
  const sickLeaveEmp = () => { return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'sick'))))) }
  const otherLeaveEmp = () => { return employees.filter((item) => item.absences.some((i => ((i.startDate <= current && i.endDate >= current) && (i.absenceType === 'other'))))) }

  const data = [
    {name: 'Aktīvi', count: activeEmp().length},
    {name: 'Atvaļinājumā', count: holidayLeaveEmp().length},
    {name: 'Slimības lapa', count: sickLeaveEmp().length},
    {name: 'Cits', count: otherLeaveEmp().length}
  ]

  return (
    <>
      <Typography sx={{mt:3, mb:3}} variant='h5'>Darbinieku pašreizējā statistika</Typography>
      <Divider/>
      <Container>
        <ResponsiveContainer minWidth={250} width="60%" aspect={2}>
            <PieChart>
              <Pie data={data} dataKey="count" innerRadius="60%" outerRadius="80%">
               <Label value={`Kopā ${employees.length}`} position="center" />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={0.9} strokeWidth={2} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} />
                  ))}
              </Pie>
              <Tooltip wrapperStyle={{ outline: "none" }} />
              <Legend iconSize={12} iconType='circle' verticalAlign='middle' align='right' layout='vertical' />
            </PieChart>
        </ResponsiveContainer>
      </Container>
      <Divider sx={{mb:3}} />
  {/* <Container>

     <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
      </PieChart>
  </Container> */}

    </>
  )
}
