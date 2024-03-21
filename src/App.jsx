import Container from "./component/Container"
import Nav from "./component/Nav"
import {Routes,BrowserRouter,Route} from "react-router-dom"
import Product from "./component/Product"
import LoginForm from "./component/LoginForm"
import Signup from "./component/Signup"
import Cart from "./component/Cart"

const App=()=>{
    return(
        <div>
            <BrowserRouter>
                <Nav></Nav>
                <Routes>
                    <Route element={<Container/>} path="/"></Route>
                    <Route element={<Product/>} path="/:id"></Route>
                    <Route element={<LoginForm/>} path="/login"></Route>
                    <Route element={<Signup/>} path="/signup"></Route>
                    <Route element={<Cart/>} path="/cart"></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App