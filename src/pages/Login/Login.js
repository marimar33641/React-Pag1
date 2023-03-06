import React, {useState} from "react";
import './Login.css'
import Title from "./component/Title/Title";
import Input from "./component/Input/Input";
import Label from "./component/Label/Label";
const Login = () =>{

    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const[ isLogin, setIsLogin ] =  useState(false);
    const[ hasError, setHasError ] = useState(false);
    const[ rol, setRols ] = useState(false);
    function handleChange(name, value){
        if( name == 'usuario' ){
            setUser(value)
        }
        else{
            if( value.length < 6 ){
                setPasswordError(true);    
            }
            else{
                setPasswordError(false);
                setPassword(value)
            }
            
        }
    }
    
    function Redirec( band ){
        if( band ){
            window.location.href="./Menu";
        }
    }
    function sleep(time){
        return new Promise((resolve)=>setTimeout(resolve,time)
      )
  }

    function ifMatch( param ){
        if( param.user.length > 0 && param.password.length > 0 ){
            if( param.user == 'marimar33641' && param.password == '12345678' ){ //Admin
                const{ user, password } = param;
                let ac = {user, password};
                let account = JSON.stringify(ac);
                localStorage.setItem( 'account', account );
                window.location.href="./Menu";
                /*
                sleep(10000000).then(()=>{
                    console.log('you can see me after 2000 milliseconds');
                })*/
                setIsLogin(true);
            }
            else if( param.user == 'Sebastian' && param.password == 'asdfghjkl' ){ //Admin
                const{ user, password } = param;
                let ac = {user, password};
                let account = JSON.stringify(ac);
                localStorage.setItem( 'account', account );
                window.location.href="./Menu2";
                setIsLogin(true);
                
            }
            else{
                setIsLogin(false);
                setHasError(true);
            }
        }else{
            setIsLogin(false);
            setHasError(true);
        }
    }

    function handleSubmit(){
        let account = {user, password}
        if( account ){
            console.log('account:',account)
            ifMatch( account );
        }
    };
   

    return(
        <div className='login-container' >
            { isLogin ? 
                <div className='home-container'>
                    <h1>¡Hola {user}!</h1>
                    <label> Felicitaciones, estas logueado.</label> 
                </div>
            :
            <div className='wrap-login'>
                <Title text ='Bienvenido!' className='login-form-title'/>
                {hasError && 
                <label className='label-alert'>
                    Su contraseña o usuario son incorrectos o no existe en nuestra plataforma.
                </label>
                }
                <Label text='Usuario' />
                <Input
                attribute={{
                    id: 'usuario',
                    name: 'usuario',
                    type: 'text',
                    placeholder: 'Ingrese su usuario'
                }}
                handleChange={handleChange}
                />
            
                <Label text='Contraseña' />
                <Input
                attribute={{
                    id: 'contraseña',
                    name: 'contraseña',
                    type: 'password',
                    placeholder: 'Ingrese su contraseña'
                }}
                handleChange={handleChange}
                param={passwordError}
                />
                {passwordError && 
                    <label className='label-error'>
                        Contraseña invalida o incompleta
                    </label>
                }
                <div className='submit-button-container'>
                    <button onClick={handleSubmit} className='submit-button-container'>
                        Ingresar
                    </button>
                </div>
            </div>
            }
        </div>
    )
};
export default Login;