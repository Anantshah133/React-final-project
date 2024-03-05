import React, { useEffect, useState } from 'react';
import "./_card.scss";
import computerIcon from "./newIcons/computer.svg";
import computer from './newIcons/computer.svg';
import bank from './newIcons/bank.svg';
import lamp from './newIcons/lamp.svg';
import headphone from './newIcons/headphone.svg';
import look from './newIcons/look.svg';
import openFile from './newIcons/open-file.svg';
import doc from './newIcons/doc.svg';
import man from './newIcons/man.svg';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import app from '../firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const db = getDatabase(app);
    const navigate = useNavigate();

    useEffect(() => {
        const adminFlag = JSON.parse(localStorage.getItem("adminFlag")) || false;
        if (!adminFlag) {
            navigate('/adminLogin');
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
                setIsLoading(false);
            }
        }, (err) => console.error("An error occured :- " + err));

        return () => cleanUp()
    }, []);

    const handleEdit = (id) => {
        navigate(`/editJob/${id}`);
    }

    const handleDelete = () => {
        if (selectedJobId) {
            remove(ref(db, `allJobs/${selectedJobId}`))
                .then(() => {
                    const updatedJobs = jobs.filter(job => job.id !== selectedJobId);
                    setJobs(updatedJobs);
                    setSelectedJobId(null);
                })
                .catch((error) => console.error("Error removing document: ", error));
        }
    };

    return (
        <main className='position-relative h-100'>
            <div className="container">
                <div className="box-heading pt-4">
                    <div className="box-title">
                        <h3 className="mb-35">Dashboard</h3>
                    </div>
                </div>
                <div>
                    <div className="section-box">
                        <div className="row">
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={computer} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>1568<span className="font-sm status up">25<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">Interview Schedules</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={computerIcon} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>284<span className="font-sm status up">5<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">Applied Jobs</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={lamp} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>136<span className="font-sm status up">12<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">Task Bids Won</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={headphone} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>985<span className="font-sm status up">5<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">Application Sent</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={look} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>165<span className="font-sm status up">15<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">Profile Viewed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={openFile} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>2356<span className="font-sm status down">- 2%</span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">New Messages</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={doc} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>254<span className="font-sm status up">2<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">Articles Added</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-4 col-sm-6">
                                <div className="card-style-1 hover-up">
                                    <div className="card-image"> <img src={man} alt="jobBox" /></div>
                                    <div className="card-info">
                                        <div className="card-title">
                                            <h3>548<span className="font-sm status up">48<span>%</span></span>
                                            </h3>
                                        </div>
                                        <p className="color-text-paragraph-2">CV Added</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-heading pt-4">
                    <div className="box-title">
                        <h3 className="mb-35">Jobs Grid</h3>
                    </div>
                </div>
                <div className='all-jobs row'>
                    {
                        jobs && !isLoading ? (
                            jobs.map((job, idx) => {
                                return (
                                    <div key={idx} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="card-grid-2 hover-up bg-custom">
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
                                                        <div className="col-lg-5 col-5 d-flex px-3"></div>
                                                    </div>
                                                </div>
                                                <div className='mt-3 d-flex gap-3'>
                                                    <button className="custom-btn-primary" onClick={() => handleEdit(job.id)}>
                                                        Edit
                                                    </button>
                                                    <button className="custom-btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onClick={() => setSelectedJobId(job.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="d-flex align-items-center justify-content-center p-5">
                                <div className="spinner-border p-4 text-primary" role="status"></div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this job?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(handleDelete)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard