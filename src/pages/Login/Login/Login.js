import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useToken from '../../../hooks/useToken';
import useTitle from '../../../hooks/useTitle';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    useTitle('Login');
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
                reset();
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    return (
        <div>
            <div className="flex justify-center items-center my-12 px-3">
                <div className="card w-96 shadow-lg">
                    <div className="card-body">
                        <h2 className="text-center text-2xl">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is required',
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email',
                                        }
                                    })}
                                    type="email"
                                    className="input input-bordered w-full max-w-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required',
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer',
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full max-w-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                                <p className='m-12'
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', top: '10', right: '0', cursor: 'pointer' }}
                                >
                                    {
                                        showPassword ?
                                            <FaEyeSlash className='text-gray-400'></FaEyeSlash>
                                            :
                                            <FaEye className='text-gray-400'></FaEye>
                                    }
                                </p>
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            <input className="btn btn-accent text-white w-full max-w-xs mt-2" type="submit" value='Login' />
                        </form>
                        {/* <p className='text-center'><small>New to Doctors Portal? <Link className='text-secondary' to='/signup'>Create new account</Link></small></p> */}
                        <div className="divider">OR</div>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;