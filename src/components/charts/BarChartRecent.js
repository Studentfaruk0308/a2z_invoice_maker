import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartRecent({invoices}) {
    const selectedInvoices = invoices.length < 5 ? invoices : invoices.slice(1).slice(-5);

    const data = selectedInvoices.map((i) => {
        const unit_price = i.unit_price ?? 0;
        const quantity = i.quantity ?? 1;
        const tax = i.tax ?? 10
        const paid_amount = i.paid_amount ?? 0
        const sum_amount = unit_price * quantity
        const total_amount = sum_amount + sum_amount * (tax/100)
        const due_amount = total_amount - paid_amount

        return {
            name: i.inv_number,
            paidAmount: paid_amount,
            dueAmount: due_amount,
        }
    })

    return (
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="paidAmount" stackId="a" fill="#82ca9d" />
          <Bar dataKey="dueAmount" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
