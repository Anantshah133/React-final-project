import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import app from "../firebase";

const EditJob = () => {
    const param = useParams();
    const id = param.id;
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const db = getDatabase(app);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const dbRef = ref(db, `allJobs/${id}`);
            const cleanUp = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setJob(data);
                    setIsLoading(false);
                }
            }, (err) => console.error("An error occured :- " + err));

            return () => cleanUp()
        } else {
            navigate('/');
        }
    }, []);

    return (
        <main style={{ height: 'calc(100vh - 108px)' }}>
            Edit id = {id}
        </main>
    )
}

export default EditJob