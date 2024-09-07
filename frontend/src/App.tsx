import Skeleton from "./templates/Skeleton";
import Brands from "./components/Brands";
import './css/app.css'

function App(){
  return(
    <div className="raiz">
      <Skeleton>
        <div>
        </div>
        <Brands />
      </Skeleton>
    </div>
  );
}

export default App;