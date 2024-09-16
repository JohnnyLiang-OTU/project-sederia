import Skeleton from "./templates/Skeleton";
import Brands from "./components/Brands";
import Products from "./components/Products";
import Hero from "./components/Hero";
import './css/app.css'

function App(){
  return(
    <div className="raiz">
      <Skeleton>
        <Hero></Hero>
        <Products />
        <Brands />
      </Skeleton>
    </div>
  );
}

export default App;