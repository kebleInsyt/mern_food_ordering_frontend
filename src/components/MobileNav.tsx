import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

export function MobileNav() {
    const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                {/* <Button variant="ghost" className="p-2"> */}
                    <Menu className="text-orange-500" />
                {/* </Button> */}
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-3">
                <SheetHeader>
                    <SheetTitle>
                        {isAuthenticated ? (
                            <span className="flex items-center font-bold gap-2">
                                <CircleUserRound className="text-orange-500" />
                                {user?.email}
                            </span>
                        ) : (
                                <span>Welcome to JoshFoods.eat!</span>
                        )} 
                       
                    </SheetTitle>
                    <Separator className="my-4" />
                    <SheetDescription className="flex flex-col gap-4">
                        {isAuthenticated ? (
                            <MobileNavLinks />                           
                        ) : (
                            <Button
                                variant="ghost"
                                className="flex-1 font-bold bg-orange-500 hover:bg-orange-600"
                                onClick={() => loginWithRedirect()}
                            >
                                Log In
                            </Button>
                        )} 
                        
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav