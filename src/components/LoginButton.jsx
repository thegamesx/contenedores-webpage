import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated} = useAuth0()

    return(
        !isAuthenticated && (
            <button className="h-16 w-32 bg-white border-2 border-black" onClick={()=> loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton;