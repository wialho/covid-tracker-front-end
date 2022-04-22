import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { colors } from './ColorSelect';

interface LineChartProps {
    data: any[];
}

const Lines = (props: LineChartProps) => {
    return (
        <LineChart>
            {props.data.map((x, i) => {
                return (
                    <Line key={i} 
                        type='monotone'
                        dataKey=''
                        stroke={colors[i].value}/>
                )
            })}
            <CartesianGrid/>
            <XAxis dataKey="date"/>
            <YAxis />
        </LineChart>
    )
}

export default Lines;

