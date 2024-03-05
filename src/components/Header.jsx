import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = ({styles}) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const adminFlag = JSON.parse(localStorage.getItem("adminFlag")) || false;

    useEffect(()=>{
        const loginFlag = JSON.parse(localStorage.getItem("loginFlag")) || false;
        setIsLoggedIn(loginFlag);
    }, []);

    console.log(isLoggedIn);
    
    const handleLogout = () => {
        localStorage.removeItem("loginFlag");
        localStorage.removeItem("adminFlag");
        signOut(auth).then(() => {
            setIsLoggedIn(false);
            setTimeout(()=> navigate('/'), 500)
        }).catch((err) => {
            console.log('Error Occured ', err);
        });
    }
    return (
        <header className="header sticky-bar" style={styles ? styles : {}}>
            <div className="container">
                <div className="main-header">
                    <div className="header-left">
                        <div className="header-logo">
                            <Link className="d-flex" to="/">
                                <img alt="jobBox" src="/images/jobhub-logo.svg" />
                            </Link>
                        </div>
                    </div>
                    <div className="header-nav">
                        <nav className="nav-main-menu">
                            <ul className="main-menu">
                                <li className="has-children"><Link className="active" to="/">Home</Link></li>
                                <li className="has-children"><Link to="/jobs-grid">Find a Job</Link></li>
                                <li className="has-children"><Link to="/">Recruiters</Link></li>
                                <li className="has-children"><Link to="/">Candidates</Link></li>
                                <li className="has-children"><Link to="/">Pages</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/">About Us</Link></li>
                                        <li><Link to="/">Pricing Plan</Link></li>
                                        <li><Link to="/">Contact Us</Link></li>
                                        <li><Link to="/">Reset Password</Link></li>
                                    </ul>
                                </li>
                                <li className="has-children"><Link to="/">Blog</Link>
                                </li>
                                <li className="dashboard"><Link to="/dashboard">Dashboard</Link></li>
                            </ul>
                        </nav>
                        <div className="burger-icon burger-icon-white"><span className="burger-icon-top"></span><span className="burger-icon-mid"></span><span className="burger-icon-bottom"></span></div>
                    </div>
                    <div className="header-right">
                        <div className="block-signin">
                            {
                                isLoggedIn || adminFlag ? (
                                    <Link className="btn btn-default btn-shadow ml-40 hover-up" onClick={handleLogout}>
                                        Log-out
                                    </Link>
                                ) : (
                                    <>
                                        <Link className="text-link-bd-btom hover-up" to="/register">Register</Link>
                                        <Link className="btn btn-default btn-shadow ml-40 hover-up" to="/login">Sign in</Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header