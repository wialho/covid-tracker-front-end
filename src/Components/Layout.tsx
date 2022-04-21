import { Wrapper } from "../BaseStyledComponents/Wrapper";
import Nav from "./Nav";

const Layout = ({children}: any) => {
    return (
        <div>
            <Nav/>
            <Wrapper>
                {children}
            </Wrapper>
        </div>
    )
}

export default Layout;