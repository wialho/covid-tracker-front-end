import styled from "styled-components";

export const PrimaryButton = styled.button`
    background-color: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;

    &:disabled {
        background-color: ${props => props.theme.secondary};
        cursor: auto;
    }
`