import "../css/card.css"
type CardProps = {
    name: string;
    description: string;
    image: string;
}
function Card({ name, description, image }: CardProps) {
    return (
      <div className="card h-100 d-flex flex-column">
        <div className="card-img-wrapper">
          <img className="card-img-top" src={image} alt="Card image cap" />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text mb-4">{description}</p>
          <a href="#" className="btn btn-primary mt-auto">
            Go somewhere
          </a>
        </div>
      </div>
    );
  }
export default Card;