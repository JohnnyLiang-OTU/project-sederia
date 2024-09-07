import Navbar from "../components/Navbar";
import { ReactNode } from "react";
interface Props{
    children?: ReactNode;
}
function Skeleton({children}: Props){
    return(
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}

export default Skeleton;