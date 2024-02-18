import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

const Login = () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const delay = 2000;
        const timeoutId = setTimeout(() => {
            setShowLoader(false);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, []);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const resetForm = () => {
        setEmail("")
        setPassword("")
    }
    const handleUserSignIn = (e) => {
        e.preventDefault();
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    localStorage.setItem("token", user.accessToken);
                    localStorage.setItem("user", JSON.stringify(user));
                    // navigate('/');
                    console.log("sucess")
                })
                .catch((error) => {
                    console.log(error);
                    setOpen(true);
                    resetForm();
                });
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = [...existingUsers, user];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            
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
            {/* <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>please check you Email address & Password</Alert>
            </Snackbar> */}
            <div class="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
                <div class="mobile-header-wrapper-inner">
                    <div class="mobile-header-content-area">
                        <div class="perfect-scroll">
                            <div class="mobile-search mobile-header-border mb-30">
                                <form action="#">
                                    <input type="text" placeholder="Search…" /><i class="fi-rr-search"></i>
                                </form>
                            </div>
                            <div class="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul class="mobile-menu font-heading">
                                        <li class="has-children"><a class="active" href="/">Home</a>

                                        </li>
                                        <li class="has-children"><a href="/">Find a Job</a>

                                        </li>
                                        <li class="has-children"><a href="/">Recruiters</a>

                                        </li>
                                        <li class="has-children"><a href="/">Candidates</a>

                                        </li>
                                        <li class="has-children"><a href="/">Pages</a>
                                            <ul class="sub-menu">
                                                <li><a href="/">About Us</a></li>
                                                <li><a href="/">Pricing Plan</a></li>
                                                <li><a href="/">Contact Us</a></li>
                                                <li><a href="/">Reset Password</a></li>
                                            </ul>
                                        </li>
                                        <li class="has-children"><a href="/">Blog</a>
                                        </li>
                                        <li><a href="http://wp.alithemes.com/html/jobbox/demos/dashboard" target="_blank">Dashboard</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="mobile-account">
                                <h6 class="mb-10">Your Account</h6>
                                <ul class="mobile-menu font-heading">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Work Preferences</a></li>
                                    <li><a href="#">Account Settings</a></li>
                                    <li><a href="#">Go Pro</a></li>
                                    <li><a href="/page-signin">Sign Out</a></li>
                                </ul>
                            </div>
                            <div class="site-copyright">Copyright 2022 © JobBox.<br />Designed by AliThemes.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
                <div class="mobile-header-wrapper-inner">
                    <div class="mobile-header-content-area">
                        <div class="perfect-scroll">
                            <div class="mobile-search mobile-header-border mb-30">
                                <form action="#">
                                    <input type="text" placeholder="Search…" /><i class="fi-rr-search"></i>
                                </form>
                            </div>
                            <div class="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul class="mobile-menu font-heading">
                                        <li class="has-children"><a class="active" href="/">Home</a></li>
                                        <li class="has-children"><a href="/">Find a Job</a></li>
                                        <li class="has-children"><a href="/">Recruiters</a></li>
                                        <li class="has-children"><a href="/">Candidates</a>
                                        </li>
                                        <li class="has-children"><a href="/">Pages</a>
                                            <ul class="sub-menu">
                                                <li><a href="/">About Us</a></li>
                                                <li><a href="/">Pricing Plan</a></li>
                                                <li><a href="/">Contact Us</a></li>
                                                <li><a href="/">Reset Password</a></li>
                                            </ul>
                                        </li>
                                        <li class="has-children"><a href="/blog-grid">Blog</a></li>
                                        <li><a href="http://wp.alithemes.com/html/jobbox/demos/dashboard" target="_blank">Dashboard</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="mobile-account">
                                <h6 class="mb-10">Your Account</h6>
                                <ul class="mobile-menu font-heading">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Work Preferences</a></li>
                                    <li><a href="#">Account Settings</a></li>
                                    <li><a href="#">Go Pro</a></li>
                                    <li><a href="/">Sign Out</a></li>
                                </ul>
                            </div>
                            <div class="site-copyright">Copyright 2022 © JobBox.<br />Designed by AliThemes.</div>
                        </div>
                    </div>
                </div>
            </div>
            <main class="main">
                <section class="pt-100 login-register">
                    <div class="container">
                        <div class="row login-register-cover">
                            <div class="col-lg-4 col-md-6 col-sm-12 mx-auto">
                                <div class="text-center">
                                    <p class="font-sm text-brand-2">Welcome back! </p>
                                    <h2 class="mt-10 mb-5 text-brand-1">Member Login</h2>
                                    <p class="font-sm text-muted mb-30">Access to all features. No credit card required.</p>
                                    <button class="btn social-login hover-up mb-20" onClick={handleGoogleLogin}><img src="/images/icon-google.svg" alt="jobbox" /><strong>Sign in with Google</strong></button>
                                    <div class="divider-text-center"><span>Or continue with</span></div>
                                </div>
                                <form class="login-register text-start mt-20" action="post" >
                                    <div class="form-group">
                                        <label class="form-label" for="input-1">Email address *</label>
                                        <input class="form-control" type="text" required="" value={email} onChange={(e) => setEmail(e.target.value)} name="fullname" placeholder="Steven Job" />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="input-4">Password *</label>
                                        <input class="form-control" type="password" required="" name="password" placeholder="************" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div class="login_footer form-group d-flex justify-content-between">
                                        <label class="cb-container">
                                            <input type="checkbox" /><span class="text-small">Remenber me</span><span class="checkmark"></span>
                                        </label><a class="text-muted" href="/page-contact">Forgot Password</a>
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-brand-1 hover-up w-100" type="submit" onClick={handleUserSignIn} name="login">Login</button>
                                    </div>
                                    <div class="text-muted text-center">Don't have an Account? <a href="/page-signin">Sign up</a></div>
                                </form>
                            </div>
                            <div class="img-1 d-none d-lg-block"><img class="shape-1" src="/images/img-4.svg" alt="JobBox" /></div>
                            <div class="img-2"><img src="/images/img-3.svg" alt="JobBox" /></div>
                        </div>
                    </div>
                </section>
            </main>
            <footer class="footer mt-50">
                <div class="container">
                    <div class="row">
                        <div class="footer-col-1 col-md-3 col-sm-12"><a href="/"><img alt="jobBox" src="/images/jobhub-logo.svg" /></a>
                            <div class="mt-20 mb-20 font-xs color-text-paragraph-2">JobBox is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.</div>
                            <div class="footer-social"><a class="icon-socials icon-facebook" href="#"></a><a class="icon-socials icon-twitter" href="#"></a><a class="icon-socials icon-linkedin" href="#"></a></div>
                        </div>
                        <div class="footer-col-2 col-md-2 col-xs-6">
                            <h6 class="mb-20">Resources</h6>
                            <ul class="menu-footer">
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Our Team</a></li>
                                <li><a href="#">Products</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-col-3 col-md-2 col-xs-6">
                            <h6 class="mb-20">Community</h6>
                            <ul class="menu-footer">
                                <li><a href="#">Feature</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Credit</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div class="footer-col-4 col-md-2 col-xs-6">
                            <h6 class="mb-20">Quick links</h6>
                            <ul class="menu-footer">
                                <li><a href="#">iOS</a></li>
                                <li><a href="#">Android</a></li>
                                <li><a href="#">Microsoft</a></li>
                                <li><a href="#">Desktop</a></li>
                            </ul>
                        </div>
                        <div class="footer-col-5 col-md-2 col-xs-6">
                            <h6 class="mb-20">More</h6>
                            <ul class="menu-footer">
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div class="footer-col-6 col-md-3 col-sm-12">
                            <h6 class="mb-20">Download App</h6>
                            <p class="color-text-paragraph-2 font-xs">Download our Apps and get extra 15% Discount on your first Order…!</p>
                            <div class="mt-15"><a class="mr-5" href="#"><img src="/images/app-store.png" alt="joxBox" /></a><a href="#"><img src="/images/android.png" alt="joxBox" /></a></div>
                        </div>
                    </div>
                    <div class="footer-bottom mt-50">
                        <div class="row">
                            <div class="col-md-6"><span class="font-xs color-text-paragraph">Copyright © 2022. JobBox all right reserved</span></div>
                            <div class="col-md-6 text-md-end text-start">
                                <div class="footer-social"><a class="font-xs color-text-paragraph" href="#">Privacy Policy</a><a class="font-xs color-text-paragraph mr-30 ml-30" href="#">Terms &amp; Conditions</a><a class="font-xs color-text-paragraph" href="#">Security</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>





    )
}

export default Login 