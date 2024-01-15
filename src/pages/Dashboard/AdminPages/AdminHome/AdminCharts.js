import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie
} from 'recharts';

const AdminCharts = () => {

    const data = [
        {
            name: 'Jan',
            value: 5000,
        },
        {
            name: 'Feb',
            value: 3000,
        },
        {
            name: 'Mar',
            value: 6000,
        },
        {
            name: 'Apr',
            value: 5500,
        },
        {
            name: 'May',
            value: 3000,
        },
        {
            name: 'Jun',
            value: 8000,
        },
        {
            name: 'Jul',
            value: 5000,
        },
        {
            name: 'Aug',
            value: 10000,
        },
        {
            name: 'Sep',
            value: 6000,
        },
        {
            name: 'Oct',
            value: 3500,
        },
        {
            name: 'Nv',
            value: 8500,
        },
        {
            name: 'Dec',
            value: 2500,
        }
    ];

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='bg-white rounded-lg p-5'>
                <div className=' border-b'>
                    <h1 className='text-xl font-family text-secondary font-semibold mb-1 ml-1'>Overview 2023 Year</h1>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        height={300}
                        data={data}
                        margin={{
                            top: 25,
                            right: 0,
                            left: -10,
                            bottom: 5
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#4158f3" background={{ fill: "#eee" }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='bg-white rounded-lg p-5'>
                <div className='border-b'>
                    <h1 className='text-xl font-family text-secondary font-semibold mb-1 ml-1'>Overview 12 Months</h1>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={400} height={300}>
                        <Tooltip />
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#4158f3"
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            fill="#82ca9d"
                            label
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminCharts;