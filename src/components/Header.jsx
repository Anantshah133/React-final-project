import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="header sticky-bar">
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
                                <li className="dashboard"><Link to="/">Dashboard</Link></li>
                            </ul>
                        </nav>
                        <div className="burger-icon burger-icon-white"><span className="burger-icon-top"></span><span className="burger-icon-mid"></span><span className="burger-icon-bottom"></span></div>
                    </div>
                    <div className="header-right">
                        <div className="block-signin">
                            <Link className="text-link-bd-btom hover-up" to="/register">Register</Link>
                            <Link className="btn btn-default btn-shadow ml-40 hover-up" to="/login">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header