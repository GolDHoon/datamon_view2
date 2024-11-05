'use client';
import React, {useCallback, useState} from "react";
import {PieChart, Pie, Sector} from "recharts";

interface ChartProps {
    data : { name : string, value : number }[],
}

interface ActiveShapeProps {
    cx : number,
    cy : number,
    midAngle : number,
    innerRadius : number,
    outerRadius : number,
    startAngle : number,
    endAngle : number,
    payload : { name : string, value : number },
    percent : number,
    name : string
}

const Chart : React.FC<ChartProps> = ({data}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const fillColor = "#8884d8";

    const renderActiveShape = (props : ActiveShapeProps) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, name
        } = props;

        const sin = Math.sin(- RADIAN * midAngle);
        const cos = Math.cos(- RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : - 1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (<g>
            <text x={cx} y={cy} dy={8} textAnchor="middle">
                <tspan x={cx} dy={0}>{payload.name}</tspan>
                <tspan x={cx} dy={18}>{payload.value} 건</tspan>
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"red"}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fillColor}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fillColor} stroke="none"/>
            <text
                x={ex + (cos >= 0 ? 1 : - 1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >
                {name}
            </text>
            <text
                x={ex + (cos >= 0 ? 1 : - 1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>);
    };

    const onPieEnter = useCallback((_ : any, index : number) => {
        setActiveIndex(index);
    }, []);

    return (<>
        <ul className="chart_value_list areatype">
            {data.map((chart, index) => (<li key={index}>
                {chart.name}: {chart.value}건
            </li>))}
        </ul>
        <PieChart width={450} height={400}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
        </PieChart>
    </>);
};

export default Chart;