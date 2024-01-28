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
        console.log("det");
  
        const storedUser: string | null = localStorage.getItem("user");
        console.log(storedUser);
  
        if (storedUser) {
          console.log("heh");
  
          const storedUser1 = JSON.parse(storedUser);
          console.log(storedUser1);
  
          setUser({ user: { email: storedUser1?.email, username: storedUser1?.displayName } });
  
          const res = await observeAuthStateLoggedInSignup();
          console.log("res,", res);
  
          setGuard(res);
        } else {
          navigate('/login');
          console.log("no storeduser");
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
      // Perform localStorage action
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
        console.log("dey",storedUser);
        
        
      }
    }, [navigate]);
  
 console.log(user?.user?.email,"loggerere");
 
  
    if (!user?.user?.email) {
      console.log("return children");
      return children;
    } 
    console.log("yassar");
    
      return null;
    
  };


export  { UserProtectedRouter,UserProtectedRouterAuthentication };
