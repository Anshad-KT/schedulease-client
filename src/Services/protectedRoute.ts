import { useState, useEffect, ReactNode } from "react";
import {  useNavigate } from "react-router-dom";  // Make sure to check this import statement

import { observeAuthStateLoggedInSignup } from "../Firebase/FireBase";
interface UserProtectedRouterProps {
    children: ReactNode;
  }
  const UserProtectedRouter: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState<{ user?: { email?: string; username?: string } } | any>(undefined);
    const [guard, setGuard] = useState<boolean>(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
  
        const storedUser: string | null = localStorage.getItem("user");
        console.log(storedUser);
  
        if (storedUser) {
     
  
          const storedUser1 = JSON.parse(storedUser);
          console.log(storedUser1);
  
          setUser({ user: { email: storedUser1?.email, username: storedUser1?.displayName } });
  
          const res = await observeAuthStateLoggedInSignup();
   
  
          setGuard(res);
        } else {
          navigate('/login');
          
        }
      };
  
      fetchData();
    }, [navigate]);
  
    if(user?.user?.email){
      return children
    }
    return null
    
  };


  const UserProtectedRouterAuthentication: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState<{ user?: { email?: string; username?: string } } | any>(undefined);
    const [guard, setGuard] = useState<boolean>(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      
      const storedUser = localStorage.getItem("user");
      console.log(JSON.stringify(storedUser));
  
      if (storedUser) {
        const storedUser1 = JSON.parse(storedUser);
        setUser({ user: { email: storedUser1?.email, username: storedUser1?.displayName } });
        observeAuthStateLoggedInSignup().then((res) => {
          setGuard(res);
        });
        navigate('/');
      }else{
     
        
      }
    }, [navigate]);

 
  
    if (!user?.user?.email) {
      console.log("return children");
      return children;
    } 
      return null;
    
  };


export  { UserProtectedRouter,UserProtectedRouterAuthentication };
