import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

const JobsGrid = () => {
    const [jobs, setJobs] = useState([]);
    const [tempState, setTempState] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustryFilters, setSelectedIndustryFilters] = useState([]);
    const [selectedJobTypeFilters, setSelectedJobTypeFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const db = getDatabase(app);
    const formRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const loginFlag = JSON.parse(localStorage.getItem("loginFlag")) || false;
        if(!loginFlag){
            navigate('/login');
        }
        const dbRef = ref(db, 'allJobs/');
        const cleanUp = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const jobsArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setJobs(jobsArray);
                setTempState([...jobsArray]);
                setIsLoading(false);
            }
        }, (err) => console.error("An error occured :- " + err));

        return () => cleanUp()
    }, []);

    const applyFilters = () => {
        let filteredJobs = [...tempState];
        console.log(selectedIndustryFilters, selectedJobTypeFilters)
        if (selectedIndustryFilters.length > 0) {
            filteredJobs = filteredJobs.filter(job =>
                selectedIndustryFilters.includes(job.type)
            );
        }

        if (selectedJobTypeFilters.length > 0) {
            filteredJobs = filteredJobs.filter(job =>
                selectedJobTypeFilters.includes(job.jobType)
            );
        }

        setJobs(filteredJobs);
    };

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterJobsBySearch(query);
    };

    // console.log(tempState)

    const filterJobsBySearch = (query) => {
        let filteredJobs = [...tempState];
        if (query.trim() !== '') {
            filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(query.toLowerCase()) ||
                job.company.toLowerCase().includes(query.toLowerCase()) ||
                job.location.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (selectedIndustryFilters.length > 0) {
            filteredJobs = filteredJobs.filter(job =>
                selectedIndustryFilters.includes(job.type.toLowerCase())
            );
        }

        if (selectedJobTypeFilters.length > 0) {
            filteredJobs = filteredJobs.filter(job => {
                // console.log(selectedJobTypeFilters, job.jobType, selectedJobTypeFilters.includes(job.jobType))
                return selectedJobTypeFilters.includes(job.jobType)
            });
        }

        setJobs(filteredJobs);
    };

    const handleIndustryFilterChange = (event) => {
        const value = event.target.value;
        console.log(value)
        if (selectedIndustryFilters.includes(value)) {
            console.log('innnnn')
            setSelectedIndustryFilters(selectedIndustryFilters.filter(filter => filter !== value));
        } else {
            console.log('out')
            setSelectedIndustryFilters([...selectedIndustryFilters, value]);
        }
    };

    const handleJobTypeFilterChange = (event) => {
        const value = event.target.value;
        if (selectedJobTypeFilters.includes(value)) {
            setSelectedJobTypeFilters(selectedJobTypeFilters.filter(filter => filter !== value));
        } else {
            setSelectedJobTypeFilters([...selectedJobTypeFilters, value]);
        }
    };

    const handleResetFilter = () => {
        setSelectedJobTypeFilters([]);
        setSelectedIndustryFilters([]);
        setJobs([...tempState]);
        formRef.current.reset();
    }

    return (
        <>
            <section className="section-box-2">
                <div className="container">
                    <div className="banner-hero banner-single banner-single-bg">
                        <div className="block-banner text-center">
                            <h3 className="wow animate__animated animate__fadeInUp"><span className="color-brand-2">{jobs.length} Jobs</span> Available Now
                            </h3>
                            <div className="form-find text-start mt-40 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                                <form>
                                    <input className="form-input input-keysearch mr-10" type="search" placeholder="Seatch for jobs here...." onChange={handleSearchInputChange} />
                                    <button type="button" className="btn btn-primary btn-find font-sm">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-box mt-30">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <form ref={formRef}>
                            <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                                <div className="content-page">
                                    <div className="box-filters-job">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-5">
                                                <span className="text-small text-showing">Showing All {jobs.length || 0} Jobs</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {jobs.length === 0 && !isLoading ? (
                                            <div className="d-flex align-items-center justify-content-center p-5">
                                                <h3>No record match with your prefferrences 😴😴😴</h3>
                                            </div>
                                        ) : isLoading ? (
                                            <div className="d-flex align-items-center justify-content-center p-5">
                                                <div className="spinner-border p-4 text-primary" role="status"></div>
                                            </div>
                                        ) : (
                                            jobs.map((job, idx) => {
                                                return (
                                                    <div key={idx} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left"><span className="flash" />
                                                                <div className="image-box"><img src={job.jobImg} alt="jobBox" /></div>
                                                                <div className="right-info"><a className="name-job" href="/frontend/company-details">{job.company}</a><span className="location-small">New York, US</span></div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6><a href="/frontend/job-details">{job.title}</a></h6>
                                                                <div className="mt-5"><span className="card-briefcase">{job.jobType}</span><span className="card-time">4<span>
                                                                    minutes ago</span></span></div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                    elit. Recusandae architecto eveniet, dolor quo repellendus pariatur</p>
                                                                <div className="mt-30"><a className="btn btn-grey-small mr-5" href="/frontend/jobs-grid">{job.location}</a><a className="btn btn-grey-small mr-5" href="/frontend/jobs-grid">Figma</a><a className="btn btn-grey-small mr-5" href="/frontend/jobs-grid">Photoshop</a>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7"><span className="card-text-price">${job.salary}</span><span className="text-muted">/Hour</span></div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                                <div className="sidebar-shadow none-shadow mb-3">
                                    <div className="sidebar-filters">
                                        <div className="filter-block head-border mb-30">
                                            <div className="d-flex">
                                                <span className="font-md font-bold">Advance Filter</span>
                                                <button type="button" className="link-reset" onClick={handleResetFilter}>Reset</button>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-primary col-12 mb-4" onClick={applyFilters}>Filter</button>

                                        <div className="filter-block mb-20">
                                            <h5 className="medium-heading mb-15">Industry</h5>
                                            <div className="form-group">
                                                <ul className="list-checkbox">
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" defaultChecked="checked" /><span className="text-small">All</span><span className="checkmark" />
                                                        </label><span className="number-item">{jobs.length}</span>
                                                    </li>
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value="development" name="category" onChange={handleIndustryFilterChange} />
                                                            <span className="text-small">Development</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.type == "development").length}</span>
                                                    </li>
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value={'finance'} name="category" onChange={handleIndustryFilterChange} />
                                                            <span className="text-small">Finance</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.type == "finance").length}</span>
                                                    </li>
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value={'designing'} name="category" onChange={handleIndustryFilterChange} />
                                                            <span className="text-small">Designing</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.type == "designing").length}</span>
                                                    </li>
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value={'medical'} name="category" onChange={handleIndustryFilterChange} />
                                                            <span className="text-small">Medical</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.type == "medical").length}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="filter-block mb-20">
                                            <h5 className="medium-heading mb-15">Job type</h5>
                                            <div className="form-group">
                                                <ul className="list-checkbox">
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value={'full time'} name="job-type" onChange={handleJobTypeFilterChange} />
                                                            <span className="text-small">Full Time</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.jobType == "full time").length}</span>
                                                    </li>
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value={'part time'} name="job-type" onChange={handleJobTypeFilterChange} />
                                                            <span className="text-small">Part Time</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.jobType == "part time").length}</span>
                                                    </li>
                                                    <li>
                                                        <label className="cb-container">
                                                            <input type="checkbox" value={'internship'} name="job-type" onChange={handleJobTypeFilterChange} />
                                                            <span className="text-small">Internship</span>
                                                            <span className="checkmark" />
                                                        </label>
                                                        <span className="number-item">{jobs.filter((job) => job.jobType == "internship").length}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default JobsGrid