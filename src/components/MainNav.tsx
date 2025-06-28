// import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
      const { loginWithRedirect, isAuthenticated } = useAuth0();
      console.log(isAuthenticated);
      return (
            <span className="flex items-center space-x-2">
                  {isAuthenticated ? (
                       <UsernameMenu /> 
                  ) : (
                        <Button
                              variant="ghost"
                              className="font-bold hover:text-orange-500 hover:bg-white"
                              onClick={() => loginWithRedirect()}
                        >
                              Log In
                        </Button>
                  )} 
            </span>
            
      )
}

export default MainNav;