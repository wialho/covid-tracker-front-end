import { LineChart, 
    Line, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend,
    ResponsiveContainer } from 'recharts';
import { colors } from './ColorSelect';

interface LineChartProps {
    data: any[];
    columns: string[]
}

const Lines = (props: LineChartProps) => {
    return (
        <ResponsiveContainer height={window.innerHeight * 0.6} width='100%'>
            <LineChart data={props.data}>
                {props.columns.map((x, i) => {
                    return (
                        <Line key={i} 
                            type='monotone'
                            dataKey={x}
                            stroke={colors[i].value}/>
                    )
                })}
                <CartesianGrid/>
                <Tooltip />
                <Legend />
                <XAxis dataKey="date"/>
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Lines;

