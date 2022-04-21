import { useAuth } from "../Auth/Auth";
import { MdLogout } from 'react-icons/md'
import { TopNav, TopNavDiv, TopNavLink } from "../BaseStyledComponents/TopNav";
import styled from "styled-components";

const LogoutButton = styled.button`
    background-color: ${props => props.theme.primary};
    color: white;
    border: none;
    padding: 10px -10px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
`

const Nav = () => {
    let auth = useAuth();

    return (
        <TopNav>
            <TopNavLink to='/'>
                Dashboard
            </TopNavLink>
            <TopNavLink to='/explore'>Explore Data</TopNavLink> 
            <TopNavDiv>
                Welcome {auth.user.name}!
                <LogoutButton><MdLogout style={{verticalAlign: 'middle'}}/></LogoutButton>
            </TopNavDiv>
                     
        </TopNav>
    );
}

export default Nav;