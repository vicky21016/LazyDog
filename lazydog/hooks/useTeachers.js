import { useState, useEffect } from "react";
import axios from "axios";

const useTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get("/teachers");
                setTeachers(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    return { teachers, loading, error };
};

export default useTeachers;
