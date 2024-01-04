function Button({ wallet }) {

    let isSignedIn = wallet.get_isSignedIn();

    const handleSignOut = () => {
        // Your sign-out logic here
        isSignedIn = wallet.signOut();
    };

    const handleSignUp = () => {
        // Your sign-up logic here
        isSignedIn = wallet.signIn();
    };
    return (
        <div className="font-urbanist">
            {isSignedIn ? <button className="w-28 h-11 rounded-full bg-black text-white border border-solid border-black " onClick={handleSignOut}>
                Sign Out
            </button> : <button className="mx-5 w-28 h-11 rounded-full bg-white text-black border border-solid border-black duration-200 hover:bg-[#D45D75] hover:text-white hover:border-0" onClick={handleSignUp} >
                Sign In
            </button>}
        </div>
    );
}




export default Button;