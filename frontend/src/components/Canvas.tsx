import { useEffect, useState } from "react";

type Product = {
    name: string;
    description: string;
}


function Canvas(){
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    });

    return(
        <div>
            <h1 className="center-text">Data From the Api</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        Name:{item.name}; Description:{item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Canvas;