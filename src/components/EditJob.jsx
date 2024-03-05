import { getDatabase, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import app from "../firebase";

const EditJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: '',
        salary: '',
        type: ''
    });
console.log(formData)
    const db = getDatabase(app);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const dbRef = ref(db, `allJobs/${id}`);
            const cleanUp = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setJob(data);
                    setFormData(data); // Set initial form data
                    setIsLoading(false);
                }
            }, (err) => console.error("An error occurred: " + err));

            return () => cleanUp();
        } else {
            navigate('/');
        }
    }, [db, id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const jobRef = ref(db, `allJobs/${id}`);
        update(jobRef, formData)
            .then(() => {
                console.log('Job updated successfully');
                navigate('/dashboard'); // Redirect to dashboard after update
            })
            .catch((error) => {
                console.error('Error updating job: ', error);
            });
    };

    return (
        <main style={{ height: 'calc(100vh - 108px)' }}>
            <div className="col-lg-12">
                <div className="section-box">
                    <div className="container">
                        <div className="panel-white mt-30 mb-30">
                            <div className="box-padding bg-postjob">
                                <h5 className="icon-edu">Edit Job Details</h5>
                                <form className="row mt-30" method="post" onSubmit={handleUpdate}>
                                    {
                                        job && !isLoading ? (
                                            <div className="col-lg-9">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-30">
                                                            <label className="font-sm color-text-mutted mb-10">Job title *</label>
                                                            <input className="form-control" value={formData.title} type="text" name="title" onChange={handleChange} placeholder="e.g. Senior Product Designer" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-30">
                                                            <label className="font-sm color-text-mutted mb-10">Job Company *</label>
                                                            <input className="form-control" value={formData.company} type="text" name="company" onChange={handleChange} placeholder="e.g. ABC Company" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group mb-30">
                                                            <label className="font-sm color-text-mutted mb-10">Job location</label>
                                                            <input className="form-control" value={formData.location} type="text" name="location" onChange={handleChange} placeholder="e.g. New York City" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group mb-30">
                                                            <label className="font-sm color-text-mutted mb-10">Job type *</label>
                                                            <select className="form-control" name="jobType" value={formData.jobType} onChange={handleChange}>
                                                                <option value="">Choose Job type</option>
                                                                <option selected={job.jobType == 'part time'} value="part time">Part time</option>
                                                                <option selected={job.jobType == 'full time'} value="full time">Full time</option>
                                                                <option selected={job.jobType == 'internship'} value="internship">Internship</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group mb-30">
                                                            <label className="font-sm color-text-mutted mb-10">Salary</label>
                                                            <input className="form-control" value={formData.salary} type="text" name="salary" onChange={handleChange} placeholder="e.g. $2200 - $2500" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group mb-30">
                                                            <label className="font-sm color-text-mutted mb-10">Category</label>
                                                            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                                                                <option value="">Choose Category</option>
                                                                <option selected={job.type == 'development'} value="development">Development</option>
                                                                <option selected={job.type == 'finance'} value="finance">Finance</option>
                                                                <option selected={job.type == 'design'} value="design">Design</option>
                                                                <option selected={job.type == 'medical'} value="medical">Medical</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-default" type="submit">Update</button>
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center p-5">
                                                <div className="spinner-border p-4 text-primary" role="status"></div>
                                            </div>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EditJob