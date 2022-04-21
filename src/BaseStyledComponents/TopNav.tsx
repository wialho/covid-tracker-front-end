import { Link } from "react-router-dom";
import styled from "styled-components";

export const TopNav = styled.div`
    background-color: ${props => props.theme.primary};
    overflow: hidden;
`

export const TopNavLink = styled(Link)`
    float: left;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;

    &:hover{
        background-color: ${props => props.theme.secondary};
    }

    &:active{
        background-color: ${props => props.theme.secondary};
    }
`

export const TopNavDiv = styled.div`
    float: right;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
`