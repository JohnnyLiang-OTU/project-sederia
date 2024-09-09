import Skeleton from "./templates/Skeleton";
import Brands from "./components/Brands";
import Products from "./components/Products";
import './css/app.css'

function App(){
  return(
    <div className="raiz">
      <Skeleton>
        <Products />
        <Brands />
      </Skeleton>
    </div>
  );
}

export default App;