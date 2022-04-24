import { useAuth } from "../Auth/Auth";
import { MdLogout } from 'react-icons/md'
import { TopNav, TopNavDiv, TopNavLink } from "../BaseStyledComponents/TopNav";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    let navigate = useNavigate();

    const logout = () => {
        auth.signout(() => {
            navigate('/login')
        });
    }

    return (
        <TopNav>
            <TopNavLink to='/'>
                Dashboard
            </TopNavLink>
            <TopNavLink to='/explore'>Explore Data</TopNavLink> 
            <TopNavDiv>
                Welcome {auth.user.name}!
                <LogoutButton onClick={logout}><MdLogout style={{verticalAlign: 'middle'}}/></LogoutButton>
            </TopNavDiv>
                     
        </TopNav>
    );
}

export default Nav;