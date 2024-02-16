import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from 'react-bootstrap/Modal';
import Footer from "./Footer";
import { data } from './data';

const Home = () => {
    const [industry, setIndustry] = useState('0');
    const [location, setLocation] = useState('');
    const [keyword, setKeyword] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [fullname, setFullName] = useState('');
    const [emailaddress, setEmailAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [resume, setResume] = useState(null);
    const [fetchData, setFetchData] = useState([]);

    const [jobs, setJobs] = useState([...data]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterJobsBySearch(query);
    };

    const filterJobsBySearch = (query) => {
        if (query.trim() === '') {
            setJobs([...data]);
            setSelectedCategory('all')
        } else {
            const filteredJobs = data.filter(job =>
                job.title.toLowerCase().includes(query.toLowerCase()) ||
                job.company.toLowerCase().includes(query.toLowerCase()) ||
                job.location.toLowerCase().includes(query.toLowerCase())
            );
            setJobs(filteredJobs);
        }
    };

    const filterJobs = (category) => {
        if (category === 'all') {
            setJobs([...data]);
        } else {
            const filteredJobs = data.filter(job => job.type === category);
            setJobs(filteredJobs);
        }
        setSelectedCategory(category);
    };

    const resetForm = () => {
        setFullName('');
        setEmailAddress('');
        setPhone('');
        setCompanyName('');
        setResume(null);
    };


    useEffect(() => {
        const delay = 3000;
        const timeoutId = setTimeout(() => {
            setShowLoader(false);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, []);

    const industries = [
        { value: "0", label: 'Industry' },
        { value: "1", label: 'Software' },
        { value: "2", label: 'Finance' },
        { value: "3", label: 'Recruting' },
        { value: "4", label: 'Management' },
        { value: "5", label: 'Advertising' },
        { value: "6", label: 'Development' }
    ];
    const locations = [{ value: '', label: 'Location' }, { value: 'AX', label: 'Aland Islands' }, { value: 'AF', label: 'Afghanistan' }, { value: 'AL', label: 'Albania' }, { value: 'DZ', label: 'Algeria' }, { value: 'AD', label: 'Andorra' }, { value: 'AO', label: 'Angola' }, { value: 'AI', label: 'Anguilla' }, { value: 'AQ', label: 'Antarctica' }, { value: 'AG', label: 'Antigua and Barbuda' }, { value: 'AR', label: 'Argentina' }, { value: 'AM', label: 'Armenia' }, { value: 'AW', label: 'Aruba' }, { value: 'AU', label: 'Australia' }, { value: 'AT', label: 'Austria' }, { value: 'AZ', label: 'Azerbaijan' }, { value: 'BS', label: 'Bahamas' }, { value: 'BH', label: 'Bahrain' }, { value: 'BD', label: 'Bangladesh' }, { value: 'BB', label: 'Barbados' }, { value: 'BY', label: 'Belarus' }, { value: 'PW', label: 'Belau' }, { value: 'BE', label: 'Belgium' }, { value: 'BZ', label: 'Belize' }, { value: 'BJ', label: 'Benin' }, { value: 'BM', label: 'Bermuda' }, { value: 'BT', label: 'Bhutan' }, { value: 'BO', label: 'Bolivia' }, { value: 'BQ', label: 'Bonaire, Saint Eustatius and Saba' }, { value: 'BA', label: 'Bosnia and Herzegovina' }, { value: 'BW', label: 'Botswana' }, { value: 'BV', label: 'Bouvet Island' }, { value: 'BR', label: 'Brazil' }, { value: 'IO', label: 'British Indian Ocean Territory' }, { value: 'VG', label: 'British Virgin Islands' }, { value: 'BN', label: 'Brunei' }, { value: 'BG', label: 'Bulgaria' }, { value: 'BF', label: 'Burkina Faso' }, { value: 'BI', label: 'Burundi' }, { value: 'KH', label: 'Cambodia' }, { value: 'CM', label: 'Cameroon' }, { value: 'CA', label: 'Canada' }, { value: 'CV', label: 'Cape Verde' }, { value: 'KY', label: 'Cayman Islands' }, { value: 'CF', label: 'Central African Republic' }, { value: 'TD', label: 'Chad' }, { value: 'CL', label: 'Chile' }, { value: 'CN', label: 'China' }, { value: 'CX', label: 'Christmas Island' }, { value: 'CC', label: 'Cocos (Keeling) Islands' }, { value: 'CO', label: 'Colombia' }, { value: 'KM', label: 'Comoros' }, { value: 'CG', label: 'Congo (Brazzaville)' }, { value: 'CD', label: 'Congo (Kinshasa)' }, { value: 'CK', label: 'Cook Islands' }, { value: 'CR', label: 'Costa Rica' }, { value: 'HR', label: 'Croatia' }, { value: 'CU', label: 'Cuba' }, { value: 'CW', label: 'CuraÇao' }, { value: 'CY', label: 'Cyprus' }, { value: 'CZ', label: 'Czech Republic' }, { value: 'DK', label: 'Denmark' }, { value: 'DJ', label: 'Djibouti' }, { value: 'DM', label: 'Dominica' }, { value: 'DO', label: 'Dominican Republic' }, { value: 'EC', label: 'Ecuador' }, { value: 'EG', label: 'Egypt' }, { value: 'SV', label: 'El Salvador' }, { value: 'GQ', label: 'Equatorial Guinea' }, { value: 'ER', label: 'Eritrea' }, { value: 'EE', label: 'Estonia' }, { value: 'ET', label: 'Ethiopia' }, { value: 'FK', label: 'Falkland Islands' }, { value: 'FO', label: 'Faroe Islands' }, { value: 'FJ', label: 'Fiji' }, { value: 'FI', label: 'Finland' }, { value: 'FR', label: 'France' }, { value: 'GF', label: 'French Guiana' }, { value: 'PF', label: 'French Polynesia' }, { value: 'TF', label: 'French Southern Territories' }, { value: 'GA', label: 'Gabon' }, { value: 'GM', label: 'Gambia' }, { value: 'GE', label: 'Georgia' }, { value: 'DE', label: 'Germany' }, { value: 'GH', label: 'Ghana' }, { value: 'GI', label: 'Gibraltar' }, { value: 'GR', label: 'Greece' }, { value: 'GL', label: 'Greenland' }, { value: 'GD', label: 'Grenada' }, { value: 'GP', label: 'Guadeloupe' }, { value: 'GT', label: 'Guatemala' }, { value: 'GG', label: 'Guernsey' }, { value: 'GN', label: 'Guinea' }, { value: 'GW', label: 'Guinea-Bissau' }, { value: 'GY', label: 'Guyana' }, { value: 'HT', label: 'Haiti' }, { value: 'HM', label: 'Heard Island and McDonald Islands' }, { value: 'HN', label: 'Honduras' }, { value: 'HK', label: 'Hong Kong' }, { value: 'HU', label: 'Hungary' }, { value: 'IS', label: 'Iceland' }, { value: 'IN', label: 'India' }, { value: 'ID', label: 'Indonesia' }, { value: 'IR', label: 'Iran' }, { value: 'IQ', label: 'Iraq' }, { value: 'IM', label: 'Isle of Man' }, { value: 'IL', label: 'Israel' }, { value: 'IT', label: 'Italy' }, { value: 'CI', label: 'Ivory Coast' }, { value: 'JM', label: 'Jamaica' }, { value: 'JP', label: 'Japan' }, { value: 'JE', label: 'Jersey' }, { value: 'JO', label: 'Jordan' }, { value: 'KZ', label: 'Kazakhstan' }, { value: 'KE', label: 'Kenya' }, { value: 'KI', label: 'Kiribati' }, { value: 'KW', label: 'Kuwait' }, { value: 'KG', label: 'Kyrgyzstan' }, { value: 'LA', label: 'Laos' }, { value: 'LV', label: 'Latvia' }, { value: 'LB', label: 'Lebanon' }, { value: 'LS', label: 'Lesotho' }, { value: 'LR', label: 'Liberia' }, { value: 'LY', label: 'Libya' }, { value: 'LI', label: 'Liechtenstein' }, { value: 'LT', label: 'Lithuania' }, { value: 'LU', label: 'Luxembourg' }, { value: 'MO', label: 'Macao S.A.R., China' }, { value: 'MK', label: 'Macedonia' }, { value: 'MG', label: 'Madagascar' }, { value: 'MW', label: 'Malawi' }, { value: 'MY', label: 'Malaysia' }, { value: 'MV', label: 'Maldives' }, { value: 'ML', label: 'Mali' }, { value: 'MT', label: 'Malta' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MQ', label: 'Martinique' }, { value: 'MR', label: 'Mauritania' }, { value: 'MU', label: 'Mauritius' }, { value: 'YT', label: 'Mayotte' }, { value: 'MX', label: 'Mexico' }, { value: 'FM', label: 'Micronesia' }, { value: 'MD', label: 'Moldova' }, { value: 'MC', label: 'Monaco' }, { value: 'MN', label: 'Mongolia' }, { value: 'ME', label: 'Montenegro' }, { value: 'MS', label: 'Montserrat' }, { value: 'MA', label: 'Morocco' }, { value: 'MZ', label: 'Mozambique' }, { value: 'MM', label: 'Myanmar' }, { value: 'NA', label: 'Namibia' }, { value: 'NR', label: 'Nauru' }, { value: 'NP', label: 'Nepal' }, { value: 'NL', label: 'Netherlands' }, { value: 'AN', label: 'Netherlands Antilles' }, { value: 'NC', label: 'New Caledonia' }, { value: 'NZ', label: 'New Zealand' }, { value: 'NI', label: 'Nicaragua' }, { value: 'NE', label: 'Niger' }, { value: 'NG', label: 'Nigeria' }, { value: 'NU', label: 'Niue' }, { value: 'NF', label: 'Norfolk Island' }, { value: 'KP', label: 'North Korea' }, { value: 'NO', label: 'Norway' }, { value: 'OM', label: 'Oman' }, { value: 'PK', label: 'Pakistan' }, { value: 'PS', label: 'Palestinian Territory' }, { value: 'PA', label: 'Panama' }, { value: 'PG', label: 'Papua New Guinea' }, { value: 'PY', label: 'Paraguay' }, { value: 'PE', label: 'Peru' }, { value: 'PH', label: 'Philippines' }, { value: 'PN', label: 'Pitcairn' }, { value: 'PL', label: 'Poland' }, { value: 'PT', label: 'Portugal' }, { value: 'QA', label: 'Qatar' }, { value: 'IE', label: 'Republic of Ireland' }, { value: 'RE', label: 'Reunion' }, { value: 'RO', label: 'Romania' }, { value: 'RU', label: 'Russia' }, { value: 'RW', label: 'Rwanda' }, { value: 'ST', label: 'São Tomé and Príncipe' }, { value: 'BL', label: 'Saint Barthélemy' }, { value: 'SH', label: 'Saint Helena' }, { value: 'KN', label: 'Saint Kitts and Nevis' }, { value: 'LC', label: 'Saint Lucia' }, { value: 'SX', label: 'Saint Martin (Dutch part)' }, { value: 'MF', label: 'Saint Martin (French part)' }, { value: 'PM', label: 'Saint Pierre and Miquelon' }, { value: 'VC', label: 'Saint Vincent and the Grenadines' }, { value: 'SM', label: 'San Marino' }, { value: 'SA', label: 'Saudi Arabia' }, { value: 'SN', label: 'Senegal' }, { value: 'RS', label: 'Serbia' }, { value: 'SC', label: 'Seychelles' }, { value: 'SL', label: 'Sierra Leone' }, { value: 'SG', label: 'Singapore' }, { value: 'SK', label: 'Slovakia' }, { value: 'SI', label: 'Slovenia' }, { value: 'SB', label: 'Solomon Islands' }, { value: 'SO', label: 'Somalia' }, { value: 'ZA', label: 'South Africa' }, { value: 'GS', label: 'South Georgia/Sandwich Islands' }, { value: 'KR', label: 'South Korea' }, { value: 'SS', label: 'South Sudan' }, { value: 'ES', label: 'Spain' }, { value: 'LK', label: 'Sri Lanka' }, { value: 'SD', label: 'Sudan' }, { value: 'SR', label: 'Suriname' }, { value: 'SJ', label: 'Svalbard and Jan Mayen' }, { value: 'SZ', label: 'Swaziland' }, { value: 'SE', label: 'Sweden' }, { value: 'CH', label: 'Switzerland' }, { value: 'SY', label: 'Syria' }, { value: 'TW', label: 'Taiwan' }, { value: 'TJ', label: 'Tajikistan' }, { value: 'TZ', label: 'Tanzania' }, { value: 'TH', label: 'Thailand' }, { value: 'TL', label: 'Timor-Leste' }, { value: 'TG', label: 'Togo' }, { value: 'TK', label: 'Tokelau' }, { value: 'TO', label: 'Tonga' }, { value: 'TT', label: 'Trinidad and Tobago' }, { value: 'TN', label: 'Tunisia' }, { value: 'TR', label: 'Turkey' }, { value: 'TM', label: 'Turkmenistan' }, { value: 'TC', label: 'Turks and Caicos Islands' }, { value: 'TV', label: 'Tuvalu' }, { value: 'UG', label: 'Uganda' }, { value: 'UA', label: 'Ukraine' }, { value: 'AE', label: 'United Arab Emirates' }, { value: 'GB', label: 'United Kingdom (UK)' }, { value: 'US', label: 'USA (US)' }, { value: 'UY', label: 'Uruguay' }, { value: 'UZ', label: 'Uzbekistan' }, { value: 'VU', label: 'Vanuatu' }, { value: 'VA', label: 'Vatican' }, { value: 'VE', label: 'Venezuela' }, { value: 'VN', label: 'Vietnam' }, { value: 'WF', label: 'Wallis and Futuna' }, { value: 'EH', label: 'Western Sahara' }, { value: 'WS', label: 'Western Samoa' }, { value: 'YE', label: 'Yemen' }, { value: 'ZM', label: 'Zambia' }, { value: 'ZW', label: 'Zimbabwe' },];

    const recruitersData = [
        {
            id: 1,
            name: 'Linkedin',
            stars: 5,
            location: 'New York, US',
            openJobs: 25,
            logoSrc: '/images/brand-1.png',
        },
        {
            id: 2,
            name: 'Adobe',
            stars: 5,
            location: 'New York, US',
            openJobs: 17,
            logoSrc: '/images/brand-2.png',
        },
        {
            id: 3,
            name: 'Dailymotion',
            stars: 5,
            location: 'New York, US',
            openJobs: 65,
            logoSrc: '/images/brand-3.png',
        },
        {
            id: 4,
            name: 'NewSum',
            stars: 5,
            location: 'New York, US',
            openJobs: 25,
            logoSrc: '/images/brand-4.png',
        },
        {
            id: 5,
            name: 'PowerHome',
            stars: 5,
            location: 'New York, US',
            openJobs: 34,
            logoSrc: '/images/brand-5.png',
        },
        {
            id: 6,
            name: 'Whop.com',
            stars: 5,
            location: 'New York, US',
            openJobs: 56,
            logoSrc: '/images/brand-6.png',
        },
        {
            id: 7,
            name: 'Greewood',
            stars: 5,
            location: 'New York, US',
            openJobs: 78,
            logoSrc: '/images/brand-7.png',
        },
        {
            id: 8,
            name: 'Kentucky',
            stars: 5,
            location: 'New York, US',
            openJobs: 98,
            logoSrc: '/images/brand-8.png',
        },
        {
            id: 9,
            name: 'Qeuity',
            stars: 5,
            location: 'New York, US',
            openJobs: 90,
            logoSrc: '/images/brand-9.png',
        },
        {
            id: 10,
            name: 'Honda',
            stars: 5,
            location: 'New York, US',
            openJobs: 34,
            logoSrc: '/images/brand-10.png',
        },
        {
            id: 11,
            name: 'PowerHome',
            stars: 5,
            location: 'New York, US',
            openJobs: 34,
            logoSrc: '/images/brand-5.png',
        },
        {
            id: 12,
            name: 'Toyota',
            stars: 5,
            location: 'New York, US',
            openJobs: 26,
            logoSrc: '/images/brand-5.png',
        },
        {
            id: 13,
            name: 'Lexuxs',
            stars: 5,
            location: 'New York, US',
            openJobs: 54,
            logoSrc: '/images/brand-3.png',
        },
        {
            id: 14,
            name: 'Ondo',
            stars: 5,
            location: 'New York, US',
            openJobs: 58,
            logoSrc: '/images/brand-6.png',
        },

        {
            id: 15,
            name: 'Vista',
            stars: 5,
            location: 'New York, US',
            openJobs: 43,
            logoSrc: '/images/brand-8.png',
        },
    ];

    const handleIndustryChange = (event) => { setIndustry(event.target.value); };
    const handleLocationChange = (event) => { setLocation(event.target.value); };
    const handleKeywordChange = (event) => { setKeyword(event.target.value); };
    return (
        <>
            {/* {showLoader && (
                <div id="preloader-active">
                    <div className="preloader d-flex align-items-center justify-content-center">
                        <div className="preloader-inner position-relative">
                            <div className="text-center">
                                <img src="/images/loading.gif" alt="jobBox" />
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow} onHide={() => setModalShow(false)}>
                <div className="modal-content apply-job-form">
                    <button className="btn-close" type="button" data-bs-dismiss="modal" onClick={() => setModalShow(false)} aria-label="Close"></button>
                    <div className="modal-body pl-30 pr-30 pt-50">
                        <div className="text-center">
                            <p className="font-sm text-brand-2">Job Application </p>
                            <h2 className="mt-10 mb-5 text-brand-1 text-capitalize">Start your career today</h2>
                            <p className="font-sm text-muted mb-30">Please fill in your information and send it to the employer.</p>
                        </div>
                        <form className="login-register text-start mt-20 pb-30" action="#" >
                            <div className="form-group">
                                <label className="form-label" for="input-1">Full Name *</label>
                                <input className="form-control" id="input-1" type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} required="" name="fullname" placeholder="Steven Job" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="input-2">Email *</label>
                                <input className="form-control" id="input-2" type="email" value={emailaddress} onChange={(e) => setEmailAddress(e.target.value)} required="" name="emailaddress" placeholder="stevenjob@gmail.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="number">Contact Number *</label>
                                <input className="form-control" id="number" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required="" name="phone" placeholder="(+01) 234 567 89" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="des">Company Name</label>
                                <input className="form-control" id="des" type="text" required="" value={companyname} onChange={(e) => setCompanyName(e.target.value)} name="Description" placeholder="Enter the company Name ..." />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="file">Upload Resume</label>
                                <input className="form-control" id="file" name="resume" onChange={(e) => setResume(e.target.files[0])} type="file" />
                            </div>
                            <div className="login_footer form-group d-flex justify-content-between">
                                <label className="cb-container">
                                    <input type="checkbox" /><span className="text-small">Agree our terms and policy</span><span className="checkmark"></span>
                                </label><a className="text-muted" href="/frontend/page-contact">Lean more</a>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-default hover-up w-100" type="submit" name="login" >Apply Job</button>
                            </div>
                            <div className="text-muted text-center">Do you need support? <a href="/frontend/page-contact">Contact Us</a></div>
                        </form>
                    </div>
                </div>
            </Modal>
            <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-search mobile-header-border mb-30">
                                <form action="#">
                                    <input type="text" placeholder="Search…" /><i className="fi-rr-search"></i>
                                </form>
                            </div>
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        <li className="has-children"><a className="active" href="/frontend/">Home</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/">Home 1</a></li>
                                                <li><a href="/frontend/index-2">Home 2</a></li>
                                                <li><a href="/frontend/index-3">Home 3</a></li>
                                                <li><a href="/frontend/index-4">Home 4</a></li>
                                                <li><a href="/frontend/index-5">Home 5</a></li>
                                                <li><a href="/frontend/index-6">Home 6</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="/frontend/jobs-grid">Find a Job</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/jobs-grid">Jobs Grid</a></li>
                                                <li><a href="/frontend/jobs-list">Jobs List</a></li>
                                                <li><a href="/frontend/job-details">Jobs Details</a></li>
                                                <li><a href="/frontend/job-details-2">Jobs Details 2</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="/frontend/companies-grid">Recruiters</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/companies-grid">Recruiters</a></li>
                                                <li><a href="/frontend/company-details">Company Details</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="/frontend/candidates-grid">Candidates</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/candidates-grid">Candidates Grid</a></li>
                                                <li><a href="/frontend/candidate-details">Candidate Details</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="/frontend/blog-grid">Pages</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/page-about">About Us</a></li>
                                                <li><a href="/frontend/page-pricing">Pricing Plan</a></li>
                                                <li><a href="/frontend/page-contact">Contact Us</a></li>
                                                <li><a href="/frontend/page-register">Register</a></li>
                                                <li><a href="/frontend/page-signin">Signin</a></li>
                                                <li><a href="/frontend/page-reset-password">Reset Password</a></li>
                                                <li><a href="/frontend/page-content-protected">Content Protected</a></li>
                                                <li><a href="/frontend/page-404">404 Error</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="/frontend/blog-grid">Blog</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/blog-grid">Blog Grid</a></li>
                                                <li><a href="/frontend/blog-grid-2">Blog Grid 2</a></li>
                                                <li><a href="/frontend/blog-details">Blog Single</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="http://wp.alithemes.com/html/jobbox/demos/dashboard" target="_blank">Dashboard</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="mobile-account">
                                <h6 className="mb-10">Your Account</h6>
                                <ul className="mobile-menu font-heading">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Work Preferences</a></li>
                                    <li><a href="#">Account Settings</a></li>
                                    <li><a href="#">Go Pro</a></li>
                                    <li><a href="/frontend/page-signin">Sign Out</a></li>
                                </ul>
                            </div>
                            <div className="site-copyright">Copyright 2022 © JobBox.<br />Designed by AliThemes.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-search mobile-header-border mb-30">
                                <form action="#">
                                    <input type="text" placeholder="Search…" /><i className="fi-rr-search"></i>
                                </form>
                            </div>
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        <li className="has-children"><a className="active" href="/frontend/">Home</a></li>
                                        <li className="has-children"><a href="/frontend/jobs-grid">Find a Job</a></li>
                                        <li className="has-children"><a href="/frontend/companies-grid">Recruiters</a></li>
                                        <li className="has-children"><a href="/frontend/candidates-grid">Candidates</a></li>
                                        <li className="has-children"><a href="/frontend/blog-grid">Pages</a>
                                            <ul className="sub-menu">
                                                <li><a href="/frontend/page-about">About Us</a></li>
                                                <li><a href="/frontend/page-pricing">Pricing Plan</a></li>
                                                <li><a href="/frontend/page-contact">Contact Us</a></li>
                                                <li><a href="/frontend/page-reset-password">Reset Password</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="/frontend/blog-grid">Blog</a>
                                        </li>
                                        <li><a href="http://wp.alithemes.com/html/jobbox/demos/dashboard" target="_blank">Dashboard</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="mobile-account">
                                <h6 className="mb-10">Your Account</h6>
                                <ul className="mobile-menu font-heading">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Work Preferences</a></li>
                                    <li><a href="#">Account Settings</a></li>
                                    <li><a href="#">Go Pro</a></li>
                                    <li><a href="/frontend/page-signin">Sign Out</a></li>
                                </ul>
                            </div>
                            <div className="site-copyright">Copyright 2022 © JobBox.<br />Designed by AliThemes.</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="near"> */}
            <div className="bg-homepage1"></div>
            <section className="section-box">
                {/* BANNER SECTION */}
                <div className="banner-hero hero-1">
                    <div className="banner-inner">
                        <div className="row">
                            <div className="col-xl-8 col-lg-12">
                                <div className="block-banner">
                                    <h1 className="heading-banner wow animate__animated animate__fadeInUp">The <span className="color-brand-2">Easiest Way</span><br className="d-none d-lg-block" />to Get Your New Job</h1>
                                    <div className="banner-description mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">Each month, more than 3 million job seekers turn to <br className="d-none d-lg-block" />website in their search for work, making over 140,000 <br className="d-none d-lg-block" />applications every single day</div>
                                    <div className="form-find mt-40 wow animate__animated animate__fadeIn" data-wow-delay=".2s">
                                        <form >
                                            <div className="box-industry">
                                                <select className="form-input mr-10 select-active input-industry" value={industry} onChange={handleIndustryChange} >
                                                    {industries.map((item) => (
                                                        <option key={item.value} value={item.value}>
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <select className="form-input mr-10 select-active" value={location} onChange={handleLocationChange}>
                                                {locations.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <input className="form-input input-keysearch mr-10" type="text" placeholder="Your keyword... " value={keyword} onChange={handleKeywordChange} />
                                            <button className="btn btn-default btn-find font-sm" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp" data-wow-delay=".3s"><strong>Popular Searches:</strong><a href="#">Designer</a>, <a href="#">Web</a>, <a href="#">IOS</a>, <a href="#">Developer</a>, <a href="#">PHP</a>, <a href="#">Senior</a>, <a href="#">Engineer</a></div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 d-none d-xl-block col-md-6">
                                <div className="banner-imgs">
                                    <div className="block-1 shape-1"><img className="img-responsive" alt="jobBox" src="/images/banner1.png" /></div>
                                    <div className="block-2 shape-2"><img className="img-responsive" alt="jobBox" src="/images/banner2.png" /></div>
                                    <div className="block-3 shape-3"><img className="img-responsive" alt="jobBox" src="/images/icon-top-banner.png" /></div>
                                    <div className="block-4 shape-3"><img className="img-responsive" alt="jobBox" src="/images/icon-bottom-banner.png" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mt-100"></div>
            {/*  category SECTION */}
            <section className="section-box mt-80">
                <div className="section-box wow animate__animated animate__fadeIn">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Browse by category</h2>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
                        </div>
                        <div className="box-swiper mt-50">
                            <div className="swiper-container swiper-group-5 swiper">
                                <div className="swiper-wrapper pb-70 pt-5">
                                    <Swiper pagination={{ type: 'fraction', }} navigation={true} modules={[Navigation]} className="mySwiper">
                                        <SwiperSlide>
                                            <div className="container">
                                                <div className="row">
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-list">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/marketing.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Marketing &amp; Sale</h4>
                                                                    <p className="font-xs">1526<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-grid">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/customer.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Customer Help</h4>
                                                                        <p className="font-xs">185<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-grid">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/finance.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Finance</h4>
                                                                    <p className="font-xs">168<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-list">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/lightning.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Software</h4>
                                                                        <p className="font-xs">1856<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-grid">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/human.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Human Resource</h4>
                                                                    <p className="font-xs">165<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-grid">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/management.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Management</h4>
                                                                        <p className="font-xs">965<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-list">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/retail.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Retail &amp; Products</h4>
                                                                    <p className="font-xs">563<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-grid">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/security.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Security Analyst</h4>
                                                                        <p className="font-xs">254<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-grid">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/content.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Content Writer</h4>
                                                                    <p className="font-xs">142<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-list">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/research.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Market Research</h4>
                                                                        <p className="font-xs">532<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="container">
                                                <div className="row">
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-list">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/marketing.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Marketing &amp; Sale</h4>
                                                                    <p className="font-xs">1526<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-grid">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/customer.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Customer Help</h4>
                                                                        <p className="font-xs">185<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-grid">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/finance.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Finance</h4>
                                                                    <p className="font-xs">168<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-list">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/lightning.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Software</h4>
                                                                        <p className="font-xs">1856<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-grid">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/human.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Human Resource</h4>
                                                                    <p className="font-xs">165<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-grid">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/management.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Management</h4>
                                                                        <p className="font-xs">965<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-list">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/retail.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Retail &amp; Products</h4>
                                                                    <p className="font-xs">563<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-grid">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/security.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Security Analyst</h4>
                                                                        <p className="font-xs">254<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                    <div className='w-253'>
                                                        <div className="swiper-slide hover-up"><a href="/frontend/jobs-grid">
                                                            <div className="item-logo">
                                                                <div className="image-left"><img alt="jobBox" src="/images/content.svg" /></div>
                                                                <div className="text-info-right">
                                                                    <h4>Content Writer</h4>
                                                                    <p className="font-xs">142<span> Jobs Available</span></p>
                                                                </div>
                                                            </div></a><a href="/frontend/jobs-list">
                                                                <div className="item-logo">
                                                                    <div className="image-left"><img alt="jobBox" src="/images/research.svg" /></div>
                                                                    <div className="text-info-right">
                                                                        <h4>Market Research</h4>
                                                                        <p className="font-xs">532<span> Jobs Available</span></p>
                                                                    </div>
                                                                </div></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-box mb-30">
                <div className="container">
                    <div className="box-we-hiring">
                        <div className="text-1"><span className="text-we-are">We are</span><span className="text-hiring">Hiring</span></div>
                        <div className="text-2">Let's <span className="color-brand-1">Work</span> Together<br /> &amp; <span className="color-brand-1">Explore</span> Opportunities</div>
                        <div className="text-3">
                            <div className="btn btn-apply btn-apply-icon" onClick={() => setModalShow(true)} data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">Apply now</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs of the day SECTION */}
            <section className="section-box mt-50">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Jobs of the day</h2>
                        <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Search and connect with the right candidates faster. </p>
                        <div className="list-tabs mt-40">
                            <ul className="nav nav-tabs" role="tablist">
                                <li>
                                    <a className={selectedCategory === 'all' ? 'active' : ''} onClick={() => filterJobs('all')} href="#tab-job-1" role="tab" aria-controls="tab-job-1" aria-selected={selectedCategory === 'all'}>
                                        <img src="/images/content.svg" alt="jobBox" /> All
                                    </a>
                                </li>
                                <li>
                                    <a className={selectedCategory === 'development' ? 'active' : ''} onClick={() => filterJobs('development')} href="#tab-job-1" role="tab" aria-controls="tab-job-1" aria-selected={selectedCategory === 'development'}>
                                        <img src="/images/management.svg" alt="jobBox" /> Development
                                    </a>
                                </li>
                                <li>
                                    <a className={selectedCategory === 'designing' ? 'active' : ''} onClick={() => filterJobs('designing')} href="#tab-job-2" role="tab" aria-controls="tab-job-2" aria-selected={selectedCategory === 'designing'}>
                                        <img src="/images/marketing.svg" alt="jobBox" /> Designing
                                    </a>
                                </li>
                                <li>
                                    <a className={selectedCategory === 'finance' ? 'active' : ''} onClick={() => filterJobs('finance')} href="#tab-job-3" role="tab" aria-controls="tab-job-3" aria-selected={selectedCategory === 'finance'}>
                                        <img src="/images/finance.svg" alt="jobBox" /> Finance
                                    </a>
                                </li>
                                <li>
                                    <a className={selectedCategory === 'medical' ? 'active' : ''} onClick={() => filterJobs('medical')} href="#tab-job-4" role="tab" aria-controls="tab-job-4" aria-selected={selectedCategory === 'medical'}>
                                        <img src="/images/human.svg" alt="jobBox" /> Medical
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-50">
                        <div className="tab-content" id="myTabContent-1">
                            <div className="tab-pane fade show active" id="tab-job-1" role="tabpanel" aria-labelledby="tab-job-1">

                                <div className='d-flex justify-content-center'>
                                    <div className="col-6 mb-4">
                                        <div className="col">
                                            <input type="text" className="border border-primary form-control" placeholder="Search jobs..."
                                                value={searchQuery} onChange={handleSearchInputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {jobs.map((job, idx) => {
                                        return <div key={idx} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                                            <div className="card-grid-2 hover-up">
                                                <div className="card-grid-2-image-left"><span className="flash"></span>
                                                    <div className="image-box">
                                                        <img src={job.jobImg} alt="jobBox" />
                                                    </div>
                                                    <div className="right-info">
                                                        <a className="name-job" href="">{job.company}</a>
                                                        <span className="location-small">{job.location}</span>
                                                    </div>
                                                </div>
                                                <div className="card-block-info">
                                                    <h6><a href="">{job.title}</a></h6>
                                                    <div className="mt-5">
                                                        <span className="card-briefcase">
                                                            {job.type}
                                                        </span>
                                                        <span className="card-time">
                                                            {parseInt(Math.random() * 60)} minutes ago
                                                        </span>
                                                    </div>
                                                    <p className="font-sm color-text-paragraph mt-15">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur
                                                    </p>
                                                    <div className="mt-30">
                                                        <a className="btn btn-grey-small mr-5" href="">Adobe XD</a>
                                                        <a className="btn btn-grey-small mr-5" href="">Figma</a>
                                                        <a className="btn btn-grey-small mr-5" href="">Photoshop</a>
                                                    </div>
                                                    <div className="card-2-bottom mt-30">
                                                        <div className="row">
                                                            <div className="col-lg-7 col-7"><span className="card-text-price">${job.salary}</span><span className="text-muted">/ Hour</span></div>
                                                            <div className="col-lg-5 col-5 text-end">
                                                                <div className="btn btn-apply-now" onClick={() => setModalShow(true)} data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">Apply now</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEARCH JOBS SECTION */}
            <section className="section-box overflow-visible mt-100 mb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="box-image-job"><img className="img-job-1" alt="jobBox" src="/images/img-chart.png" /><img className="img-job-2" alt="jobBox" src="/images/controlcard.png" />
                                <figure className="wow animate__animated animate__fadeIn"><img alt="jobBox" src="/images/img1.png" /></figure>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="content-job-inner"><span className="color-text-mutted text-32">Millions Of Jobs. </span>
                                <h2 className="text-52 wow animate__animated animate__fadeInUp">Find The One That’s <span className="color-brand-2">Right</span> For You</h2>
                                <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide. The right job is out there.</div>
                                <div className="mt-40">
                                    <div className="wow animate__animated animate__fadeInUp"><a className="btn btn-default" href="/frontend/jobs-grid">Search Jobs</a><a className="btn btn-link" href="/frontend/page-about">Learn More</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPLETE SOLUTION SECTION */}
            <section className="section-box overflow-visible mt-50 mb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="text-center">
                                <h1 className="color-brand-2"><span className="count">25</span><span> K+</span></h1>
                                <h5>Completed Cases</h5>
                                <p className="font-sm color-text-paragraph mt-10">We always provide people a <br className="d-none d-lg-block" />complete solution upon focused of<br className="d-none d-lg-block" /> any business</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="text-center">
                                <h1 className="color-brand-2"><span className="count">17</span><span> +</span></h1>
                                <h5>Our Office</h5>
                                <p className="font-sm color-text-paragraph mt-10">We always provide people a <br className="d-none d-lg-block" />complete solution upon focused of <br className="d-none d-lg-block" />any business</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="text-center">
                                <h1 className="color-brand-2"><span className="count">86</span><span> +</span></h1>
                                <h5>Skilled People</h5>
                                <p className="font-sm color-text-paragraph mt-10">We always provide people a <br className="d-none d-lg-block" />complete solution upon focused of <br className="d-none d-lg-block" />any business</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="text-center">
                                <h1 className="color-brand-2"><span className="count">28</span><span> +</span></h1>
                                <h5>CHappy Clients</h5>
                                <p className="font-sm color-text-paragraph mt-10">We always provide people a <br className="d-none d-lg-block" />complete solution upon focused of <br className="d-none d-lg-block" />any business</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOP RECRUITERS SECTION */}
            <section className="section-box mt-50">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Top Recruiters</h2>
                        <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Discover your next career move, freelance gig, or internship</p>
                    </div>
                </div>
                <div className="container">
                    <div className="box-swiper mt-50">
                        <div className="swiper-container swiper-group-1 swiper-style-2 swiper">
                            {recruitersData.map((Recruiters, index) => (
                                <div className="swiper-slide" key={index}>
                                    <div className="item-5 hover-up wow animate__animated animate__fadeIn">
                                        <div className="item-logo">
                                            <div className="image-left"><img alt={Recruiters.name} src={Recruiters.logoSrc} /></div>
                                            <div className="text-info-right">
                                                <h4>{Recruiters.name}</h4>
                                                <img alt="star" src="/images/star.svg" />
                                                <img alt="star" src="/images/star.svg" />
                                                <img alt="star" src="/images/star.svg" />
                                                <img alt="star" src="/images/star.svg" />
                                                <img alt="star" src="/images/star.svg" />
                                                <span className="font-xs color-text-mutted ml-10"><span>(</span><span>{Recruiters.openJobs}</span><span>)</span></span>
                                            </div>
                                            <div className="text-info-bottom mt-5"><span className="font-xs color-text-mutted icon-location">{Recruiters.location}</span><span className="font-xs color-text-mutted float-end mt-5">25<span> Open Jobs</span></span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div >
                </div >
            </section >

            {/* JOBS BY LOCATION SECTION */}
            <section className="section-box mt-50">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Jobs by Location</h2>
                        <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Find your favourite jobs and get the benefits of yourself</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-50">
                        <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                            <div className="card-image-top hover-up"><a href="/frontend/jobs-grid">
                                <div className="image" style={{ backgroundImage: `url(/images/location1.png)` }}><span className="lbl-hot">Hot</span></div></a>
                                <div className="informations"><a href="/frontend/jobs-grid">
                                    <h5>Paris, France</h5></a>
                                    <div className="row">
                                        <div className="col-lg-6 col-6"><span className="text-14 color-text-paragraph-2">5 Vacancy</span></div>
                                        <div className="col-lg-6 col-6 text-end"><span className="color-text-paragraph-2 text-14">120 companies</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
                            <div className="card-image-top hover-up"><a href="/frontend/jobs-grid">
                                <div className="image" style={{ backgroundImage: ` url(/images/location2.png)` }}><span className="lbl-hot">Trending</span></div></a>
                                <div className="informations"><a href="/frontend/jobs-grid">
                                    <h5>London, England</h5></a>
                                    <div className="row">
                                        <div className="col-lg-6 col-6"><span className="text-14 color-text-paragraph-2">7 Vacancy</span></div>
                                        <div className="col-lg-6 col-6 text-end"><span className="color-text-paragraph-2 text-14">68 companies</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
                            <div className="card-image-top hover-up"><a href="/frontend/jobs-grid">
                                <div className="image" style={{ backgroundImage: ` url(/images/location3.png)` }}><span className="lbl-hot">Hot</span></div></a>
                                <div className="informations"><a href="/frontend/jobs-grid">
                                    <h5>New York, USA</h5></a>
                                    <div className="row">
                                        <div className="col-lg-6 col-6"><span className="text-14 color-text-paragraph-2">9 Vacancy</span></div>
                                        <div className="col-lg-6 col-6 text-end"><span className="color-text-paragraph-2 text-14">80 companies</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
                            <div className="card-image-top hover-up"><a href="/frontend/jobs-grid">
                                <div className="image" style={{ backgroundImage: ` url(/images/location4.png)` }}></div></a>
                                <div className="informations"><a href="/frontend/jobs-grid">
                                    <h5>Amsterdam, Holland</h5></a>
                                    <div className="row">
                                        <div className="col-lg-6 col-6"><span className="text-14 color-text-paragraph-2">16 Vacancy</span></div>
                                        <div className="col-lg-6 col-6 text-end"><span className="color-text-paragraph-2 text-14">86 companies</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
                            <div className="card-image-top hover-up"><a href="/frontend/jobs-grid">
                                <div className="image" style={{ backgroundImage: ` url(/images/location5.png)` }}></div></a>
                                <div className="informations"><a href="/frontend/jobs-grid">
                                    <h5>Copenhagen, Denmark</h5></a>
                                    <div className="row">
                                        <div className="col-lg-6 col-6"><span className="text-14 color-text-paragraph-2">39 Vacancy</span></div>
                                        <div className="col-lg-6 col-6 text-end"><span className="color-text-paragraph-2 text-14">186 companies</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                            <div className="card-image-top hover-up"><a href="/frontend/jobs-grid">
                                <div className="image" style={{ backgroundImage: ` url(/images/location6.png)` }}></div></a>
                                <div className="informations"><a href="/frontend/jobs-grid">
                                    <h5>Berlin, Germany</h5></a>
                                    <div className="row">
                                        <div className="col-lg-6 col-6"><span className="text-14 color-text-paragraph-2">15 Vacancy</span></div>
                                        <div className="col-lg-6 col-6 text-end"><span className="color-text-paragraph-2 text-14">632 companies</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-box mt-50 mb-20">
                <div className="container">
                    <div className="box-newsletter">
                        <div className="row">
                            <div className="col-xl-3 col-12 text-center d-none d-xl-block"><img src="/images/newsletter-left.png" alt="joxBox" /></div>
                            <div className="col-lg-12 col-xl-6 col-12">
                                <h2 className="text-md-newsletter text-center">New Things Will Always<br /> Update Regularly</h2>
                                <div className="box-form-newsletter mt-40">
                                    <form className="form-newsletter">
                                        <input className="input-newsletter" type="text" value="" placeholder="Enter your email here" />
                                        <button className="btn btn-default font-heading icon-send-letter">Subscribe</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xl-3 col-12 text-center d-none d-xl-block"><img src="/images/newsletter-right.png" alt="joxBox" /></div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Home; 