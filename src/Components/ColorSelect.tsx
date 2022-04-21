import { Option } from "../BaseStyledComponents/Option";
import { Select } from "../BaseStyledComponents/Select";

interface ColorSelectProps{
    onSelect: (x: string) => void
    initialValue: string
}

const ColorSelect = (props: ColorSelectProps) => {
    return (
        <Select value={props.initialValue} onChange={(e) => props.onSelect(e.target.value)}>
            <Option value="#fc2847" 
                color="#fc2847" 
                textColor="white">Red</Option>
            <Option value="#ffa343" 
                color="#ffa343" 
                textColor="white">Orange</Option>
            <Option value="#fdfc74" 
                color="#fdfc74" 
                textColor="lightgray">Yellow</Option>
            <Option value="#71bc78"
                color="#71bc78" 
                textColor="white">Green</Option>
            <Option value="#0f4c81" 
                color="#0f4c81"
                textColor="white">Blue</Option>
            <Option value="#7442cb"
                color="#7442cb" 
                textColor="white">Purple</Option>
            <Option value="#fb7efd"
                color="#fb7efd"
                textColor="white">Violet</Option>
        </Select>
    )
}

export default ColorSelect;