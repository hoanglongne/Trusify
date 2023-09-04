import LogoContainer from "./LogoContainer";
import NavItems from "./NavItems";
import Button from "./Button";

function Navbar({wallet}) {
    return (
        <div className="flex fixed w-screen justify-around items-center h-[125px] bg-white">
                <LogoContainer/>
                <NavItems/>
                <Button wallet={wallet}/>
        </div>
    );
    
}

export default Navbar;