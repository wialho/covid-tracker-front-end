import { useEffect, useState } from "react";
import { Col } from "../BaseStyledComponents/Col";
import { Row } from "../BaseStyledComponents/Row";
import { Wrapper } from "../BaseStyledComponents/Wrapper";
import Layout from "../Components/Layout";
import Nav from "../Components/Nav";

const Dashboard = () => {
    const [views, setViews] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <Layout>
            <p>Hello Dashboard</p>
        </Layout>
    );
}

export default Dashboard;