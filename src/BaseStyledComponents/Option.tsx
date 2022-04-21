import styled from "styled-components";

interface OptionProps{
    color?: string
    textColor?: string
}

export const Option = styled.option`
    background-color: ${(props: OptionProps) => !!props.color ? props.color : 'white'};
    color: ${(props: OptionProps) => !!props.textColor ? props.textColor : 'gray' };
`