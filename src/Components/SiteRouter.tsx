import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Auth/Auth";
import PrivateRoute from "../Auth/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import ExploreData from "../Pages/ExploreData";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Signup from "../Pages/Signup";

const SiteRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={
                        <PrivateRoute> 
                            <Dashboard/> 
                        </PrivateRoute>} />
                    <Route path='/explore' element={
                        <PrivateRoute>
                            <ExploreData/>
                        </PrivateRoute>} />
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default SiteRouter;