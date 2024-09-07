// import { Link } from 'react-router-dom'
import "../css/navbar.css"

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left-section">
                <h5 className="company-name">Gera S.A Enterprises</h5>
                <h6 className="company-name">Electronicos y Linea Blanca</h6>
            </div>
            <div>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}