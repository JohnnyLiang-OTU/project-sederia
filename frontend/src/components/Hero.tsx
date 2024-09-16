import "../css/canvas.css";
import logo from "../assets/logo_transparent.png";
function Hero() {
    return (
        <section className="bg-dark text-white min-vh-100 d-flex py-5">
          <div className="container text-center">
          <img className="img-fluid bg-dark" alt="Logo-Gera" src={logo} style={{ maxWidth: '350px', maxHeight: '350px' }} />
            <h1 className="display-4 fw-bold">
              Descubre lo Ultimo en Electrónica
            </h1>
            <p className="lead">
              Tecnología Innovadora y Calidad Máxima 
            </p>
            <div>
              <a href="#shop" className="btn btn-outline-primary btn-lg me-3">
                Cotiza con Nosotros
              </a>
              <a href="#learn-more" className="btn btn-outline-light btn-lg">
                Ver Productos
              </a>
            </div>
          </div>
        </section>
      );
}

export default Hero;