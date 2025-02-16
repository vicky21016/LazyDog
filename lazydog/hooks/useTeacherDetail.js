import { useState, useEffect } from "react";
import axios from "axios";

const useTeacherDetail = (id) => {
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axios.get(`/teachers/${id}`);
                setTeacher(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    return { teacher, loading, error };
};

export default useTeacherDetail;
