import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const [showLoader, setShowLoader] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    useEffect(() => {
        const delay = 2000;
        const timeoutId = setTimeout(() => {
            setShowLoader(false);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, []);

    const staticEmail = "heet@gmail.com";
    const staticPassword = "heet@123";

    const handleUserSignIn = (e) => {
        e.preventDefault()
        if (email === staticEmail && password === staticPassword) {
            localStorage.setItem("loginFlag", "true");
            setIsLoggedIn(true);
            setTimeout(() => navigate('/'), 1000)
        } else {
            setShowErrorToast(true);
        }
    }
    const handleGoogleLogin = async () => {
        setIsLoggedIn(true);
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = [...existingUsers, user];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('loginFlag', "true");
            navigate('/jobs-grid');

        } catch (error) {
            console.log(error);

        }
    };
    return (
        <div>
            {showLoader && (
                <div id="preloader-active">
                    <div className="preloader d-flex align-items-center justify-content-center">
                        <div className="preloader-inner position-relative">
                            <div className="text-center">
                                <img src="images/loading.gif" alt="jobBox" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <main className="main">
                <section className="pt-100 login-register">
                    <div className="container">
                        <div className="row login-register-cover">
                            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                                <div className="text-center">
                                    <p className="font-sm text-brand-2">Welcome back! </p>
                                    <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
                                    <p className="font-sm text-muted mb-30">Access to all features. No credit card required.</p>
                                    <button className="btn social-login hover-up mb-20" onClick={handleGoogleLogin}>
                                        <img src="/images/icon-google.svg" alt="jobbox" />
                                        <strong>Sign in with Google</strong>
                                    </button>
                                    <div className="divider-text-center"><span>Or continue with</span></div>
                                </div>
                                <form className="login-register text-start mt-20" >
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="input-1">Email address *</label>
                                        <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="input-4">Password *</label>
                                        <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                                    </div>
                                    <div className="login_footer form-group d-flex justify-content-between">
                                        <label className="cb-container">
                                        </label><a className="text-muted" href="/page-contact">Forgot Password</a>
                                    </div>
                                    {showSuccessToast && (
                                        <>
                                            <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert"></div>
                                            <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                    </svg>
                                                    <span class="sr-only">Check icon</span>
                                                </div>
                                                <div class="ms-3 text-sm font-normal">Item moved successfully.</div>
                                                <button type="button" onClick={() => setShowSuccessToast(false)} class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                                                    <span class="sr-only">Close</span>
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {/* Error toast */}
                                    {showErrorToast && (
                                        <>
                                            {/* <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert"></div> */}
                                            <div id="toast-danger" class="flex danger-toast items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                                    </svg>
                                                    <span class="sr-only">Error icon</span>
                                                </div>
                                                <div class="ms-3 text-sm font-normal">Item has been deleted.</div>
                                                <button type="button" onClick={() => setShowErrorToast(false)} class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                                                    <span class="sr-only">Close</span>
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    <div className="form-group">
                                        <button className="btn btn-brand-1 hover-up w-100" type="submit" name="login" onClick={handleUserSignIn}>Login</button>
                                    </div>
                                    <div className="text-muted text-center">Don't have an Account? <a href="/page-signin">Sign up</a></div>
                                </form>
                            </div>
                            <div className="img-1 d-none d-lg-block"><img className="shape-1" src="/images/img-4.svg" alt="JobBox" /></div>
                            <div className="img-2"><img src="/images/img-3.svg" alt="JobBox" /></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Login;