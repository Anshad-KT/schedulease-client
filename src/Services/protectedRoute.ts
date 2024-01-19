import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { observeAuthStateLoggedInSignup } from "../Firebase/FireBase";
interface UserProtectedRouterProps {
    children: ReactNode;
  }
const UserProtectedRouter: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState<{ user?: { email?: string,username?:string } }|any>(undefined);
    const [guard,setGuard] = useState<boolean>(false)
    const navigate = useNavigate();
  useEffect(() => {

    console.log("det");
    
    const storedUser: string | null = localStorage.getItem("user");
    console.log(storedUser);
    
    if (storedUser) {
        console.log("heh");
        
        const storedUser1 = JSON.parse(storedUser);
        console.log(storedUser1);
    
        setUser({user: {email: storedUser1?.email, username: storedUser1?.displayName}});
        
        observeAuthStateLoggedInSignup().then((res) => {
            console.log("res,",res);
            
            setGuard(res);
        });
    }else{
        console.log("sdsd");
        
    }
   
  }, []);



  
  if (user?.user?.email ) {
    console.log(user.user.email,user.email,guard);
    console.log("return children");
    
    return children;
  } else {

    console.log("sdsd");
    
    navigate("/login");
    return null;
  }
};


const UserProtectedRouterAuthentication: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState<{ user?: { email?: string,username?:string } }|any>(undefined);
    const [guard,setGuard] = useState<boolean>(false)
    const navigate = useNavigate();
  useEffect(() => {
    // Perform localStorage action
   
    const storedUser:any = localStorage.getItem("user") as string
    console.log( JSON.stringify(storedUser));
    
    if (storedUser) {
        const storedUser1 = JSON.parse(storedUser) 
        setUser({user: {email: storedUser1?.email,username:storedUser1?.displayName}});
        observeAuthStateLoggedInSignup().then((res)=>{
            setGuard(res)
        })
    }
  }, []); 

  
  if (!user?.user.email ) {
    console.log("return children");
    
    return children;
  } else {

    console.log("return nullu");
    
    navigate("/");
    return null;
  }
};



export  { UserProtectedRouter,UserProtectedRouterAuthentication };
