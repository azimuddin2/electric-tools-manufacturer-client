import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const provider = new GoogleAuthProvider();

    const handleSignInWithGoogle = () => {
        signInWithGoogle(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(user.email)
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    return (
        <div>
            <button
                onClick={handleSignInWithGoogle}
                className="btn btn-outline w-full max-w-md"
            >
                <FcGoogle className='text-3xl'></FcGoogle>
                <span className='ml-1'>CONTINUE WITH GOOGLE</span>
            </button>
        </div>
    );
};

export default SocialLogin;