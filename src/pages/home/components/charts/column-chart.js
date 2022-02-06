import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const ColumnChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            { date: '2022-2-6', kg: 90, category: '平板卧推' },
            { date: '2022-2-6', kg: 60, category: '上斜卧推' },
            { date: '2022-2-6', kg: 5, category: '飞鸟' },
            { date: '2022-2-13', kg: 100, category: '平板卧推' },
            { date: '2022-2-13', kg: 70, category: '上斜卧推' },
            { date: '2022-2-13', kg: 7.5, category: '飞鸟' },
        ])
    }, []);

    const config = {
        data,
        isStack: true,
        xField: 'date',
        yField: 'kg',
        seriesField: 'category',
        label: {
            position: 'middle',
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    return <Column {...config} />;
};

export default ColumnChart