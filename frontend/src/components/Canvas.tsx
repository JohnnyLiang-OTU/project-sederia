import { useEffect, useState } from "react";
import Card from "./Card";
import "../css/canvas.css";
type Product = {
    name: string;
    description: string;
    image: string;
}

function Canvas() {
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => {
                console.error(error);
                return (
                    <div>
                        Data cannot be processed.
                    </div>
                );
            });
    }, []);
    return (

        <section className="bg-light pt-5 pb-5 shadow-sm">
            <div className="container">
                <p>
                    <h1 className="text-upppercase border-bottom">Data From the Api</h1>
                </p>

                <div className="row">
                    {data.map((item) => (
                        <div className="col-lg-3 md-4 mb-3 d-flex align-items-stretch">
                            <Card image={item.image} name={item.name} description={item.description} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Canvas;