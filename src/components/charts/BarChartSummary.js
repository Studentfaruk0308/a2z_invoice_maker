import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,

} from 'recharts';

export default function BarChartSummary({invoices}) {
    // Find number of invoices that are fully paid, eg 5 out of 10
    const paidData = invoices.reduce((accu, curr) => {
        const unit_price = curr.unit_price ?? 0;
        const quantity = curr.quantity ?? 1;
        const tax = curr.tax ?? 10
        const paid_amount = curr.paid_amount ?? 0
        const sum_amount = unit_price * quantity
        const total_amount = sum_amount + sum_amount * (tax/100)
        const due_amount = total_amount - paid_amount
        return { 
          total_amount: accu.total_amount + total_amount,
          due_amount: accu.due_amount + due_amount,
          paid_amount: accu.paid_amount + paid_amount
        }
    }, {total_amount: 0, due_amount: 0, paid_amount: 0});

    const data = [
      {
        name: 'Total Amount',
       value: paidData.total_amount,
       fill: "#8884d8",
      },
      {
        name: 'Paid Amount',
        value: paidData.paid_amount,
        fill: "#14F183"
      },
      {
        name: 'Due Amount',
        value: paidData.due_amount,
        fill: "#FF0003"
      },
    ];

    return (
      <ResponsiveContainer width="120%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 120,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="value"/>
        </BarChart>
      </ResponsiveContainer>
    );
  }