import { Container } from 'react-bootstrap';
import Users from './components/Users';
import PrivateRoute from './components/PrivateRoute';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Admin from './pages/Admin';
import UserManagement from './components/UserManagment';
import "bootstrap/dist/css/bootstrap.min.css";
import EditUser from './pages/edits/EditUser';
import Employees from './components/Employees';
import AddEmployee from './pages/creates/AddEmployee';
import EditEmployee from './pages/edits/EditEmployee';
import Products from './components/Products';
import EditProduct from './pages/edits/EditProduct';
import AddProduct from './pages/creates/AddProduct';
import AddUser from './pages/creates/AddUser';
import ShopInfo from './components/ShopInfo';
import Stock from './components/Stock';
import EditStock from './pages/edits/EditStock';
import AddStock from './pages/creates/AddStock';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import About from './components/About';
import Contact from './components/Contact';
import BusinessCards from './components/product categories/BusinessCards';
import PromotionalProducts from './components/product categories/Promotional';
import LogoMaker from './components/product categories/Logomaker';
import Clothing from './components/product categories/Clothing';
import HomeGifts from './components/product categories/HomeGifts';
import Invitations from './components/product categories/Invitations';
import Postcards from './components/product categories/Postcards';
import Signs from './components/product categories/Signs';
import Labels from './components/product categories/Labels';




function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/products" element={<Products />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user-context" element={<UserManagement />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/shop-info" element={<ShopInfo />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/edit-stock/:id" element={<EditStock />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business-cards" element={<BusinessCards />} />
          <Route path="/promotional" element={<PromotionalProducts />} />
          <Route path="/logomaker" element={<LogoMaker />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/home-gifts" element={<HomeGifts />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/postcards" element={<Postcards />} />
          <Route path="/signs" element={<Signs />} />
          <Route path="/labels" element={<Labels />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
