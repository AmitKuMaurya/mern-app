import AllRoute from './AllRoutes/AllRoute';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Product from './components/product/Product';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoute/>
      <Product/>
    </div>
  );
}

export default App;
