import { faEarDeaf } from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";

const Formulario = ()=>{

    const{register, handleSubmit} = useForm();
    return <div>
        <h2>
            Formulario
        </h2>
        <form>
            <div>
                <label>CC Vendedor</label>
                <input type="text" CC_Vendedor=""/>
            </div>
            <div>
                <label>CC Cliente</label>
                <input type="text" CC_Cliente=""/>
            </div>
            <div>
                <label>Cantidad productos</label>
                <input type="number" Cant_Productos=""/>
            </div>
            <input type="submit" value="Enviar"/>


             
            
        </form>
    </div>
}
export default Formulario;