import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


// https://recharts.org/en-US/examples/PieChartWithCustomizedLabel

export default function PieChartPaid({invoices}) {
    const totalInvoices = invoices?.length ?? 0

    // Find number of invoices that are fully paid, eg 5 out of 10
    const numberPaid = invoices.reduce((accu, curr) => {
        const unit_price = curr.unit_price ?? 0;
        const quantity = curr.quantity ?? 1;
        const tax = curr.tax ?? 10
        const paid_amount = curr.paid_amount ?? 0
        const sum_amount = unit_price * quantity
        const total_amount = sum_amount + sum_amount * (tax/100)
        const due_amount = total_amount - paid_amount
        return accu + (due_amount <= 0) ?? 0
    }, 0);

    const data = [
        { name: `Paid ${numberPaid}/${totalInvoices}`, value: numberPaid },
        { name: `Unpaid ${totalInvoices-numberPaid}/${totalInvoices}`, value: totalInvoices - numberPaid },
      ];

    const COLORS = ['#0088FE',  '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {data?.[index]?.name}
        </text>
        );
    };


    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
