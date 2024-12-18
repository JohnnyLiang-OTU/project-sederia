import apple from "../assets/brands/apple.png"
import jbl from "../assets/brands/jbl.jpg"
import lenovo from "../assets/brands/lenovo.jpg"
import samsung from "../assets/brands/samsung.jpg"
import lg from "../assets/brands/lg.png"
import "../css/brands.css"

function Brands(){
    return(
    <div className="brands-container">
        <img className="brands-image" src={apple}></img>
        <img className="brands-image" src={jbl}></img>
        <img className="brands-image" src={lenovo}></img>
        <img className="brands-image" src={samsung}></img>
        <img className="brands-image" src={lg}></img>
    </div>
    );
}

export default Brands;