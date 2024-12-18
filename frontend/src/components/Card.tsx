import "../css/card.css"

type CardProps = {
    name: string;
    description: string;
    image: string;
}

function Card({ name, description, image }: CardProps) {
  return (
    <div
      className="card h-100 d-flex flex-column text-dark"
      style={{
        backgroundColor: '#2b2b2b',
        padding: '20px',
      }}
    >
      <div className="card-img-wrapper" style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
        <img className="card-img-top" src={image} alt="Card image cap" style={{ borderRadius: '8px' }} />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center text-light">{name}</h5>
        <p className="card-text text-center mb-4 text-light">{description}</p>
        <a href="#" className="btn btn-primary mt-auto">
          Cotizar
        </a>
      </div>
    </div>
  );
}




export default Card;
