import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useToken from '../../../hooks/useToken';
import useTitle from '../../../hooks/useTitle';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import loginGif from '../../../assets/images/login.gif';
import { MdErrorOutline } from 'react-icons/md';
import swal from 'sweetalert';

const Login = () => {
    useTitle('Login');
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [adminAccess, setAdminAccess] = useState(true);
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
                saveUserDataBase(user.displayName, user.email);
                setLoginUserEmail(user.email);
                reset();
                swal({
                    title: "User Login Successful!",
                    text: `Welcome - ${user.displayName}`,
                    icon: "success"
                });
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    const saveUserDataBase = (name, email) => {
        const userInfo = {
            name,
            email
        };
        fetch('https://electric-tools-manufacturer-server-two.vercel.app/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    };

    if (adminAccess === true) {
        swal({
            title: "Admin Access🔐",
            text: "📧Email: admin@gmail.com & 🔑Password: 1234567@",
            icon: "info",
            button: "Close",
        });
        setAdminAccess(false);
    }

    return (
        <section className='max-w-screen-lg lg:mx-auto hero my-12 lg:my-16'>
            <div className='hero-content grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10'>
                <div>
                    <img src={loginGif} alt="Login" className='w-full' />
                </div>
                <div className="card w/full shadow lg:shadow-none lg:border py-2">
                    <div className="card-body px-5 md:px-8">
                        <h2 className="text-center text-3xl">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
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
                                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
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
                                    className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <p className='m-12'
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', marginTop: '51px', right: '0', cursor: 'pointer' }}
                                >
                                    {
                                        showPassword ?
                                            <FaEyeSlash className='text-gray-400'></FaEyeSlash>
                                            :
                                            <FaEye className='text-gray-400'></FaEye>
                                    }
                                </p>
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500 flex items-center text-sm"><MdErrorOutline className='text-xl' />{errors.password.message}</span>}
                                </label>
                            </div>
                            <input
                                type="submit"
                                value='Login'
                                className="btn btn-primary text-white w-full mt-2 text-base"
                            />
                        </form>
                        <p className='text-center text-lg'><small>New to Autozpro? <Link className='text-primary link font-medium' to='/signup'>SignUp Now</Link></small></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;