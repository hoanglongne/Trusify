import { useEffect, useState } from 'react';
import LogoContainer from "./LogoContainer";
import NavItems from "./NavItems";
import Button from "./Button";

function Navbar({wallet}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-wrap md:flex-nowrap fixed w-screen justify-between pl-[22px] pr-[30px] md:px-[60px] lg:px-[100px] items-center h-[70px] md:h-[80px] lg:h-[110px] bg-white">
            <LogoContainer className="w-full md:w-auto"/>
            <button className="md:hidden z-30" onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            <div className="hidden md:flex justify-between items-center">
                <NavItems className="w-full md:w-auto"/>
            </div>
            <div className="hidden md:w-auto md:flex">
                <Button wallet={wallet}/>
            </div>
            {isOpen && (
                <div className="fixed z-20 top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center gap-5 md:hidden">
                    <NavItems className="w-full"/>
                    <Button wallet={wallet} className="w-full"/>
                </div>
            )}
        </div>
    );
}

export default Navbar;