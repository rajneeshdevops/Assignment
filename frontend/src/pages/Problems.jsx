import { useEffect, useState } from "react";
import API from "../api/api";
import ProblemCard from "../components/ProblemCard";

const Problems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await API.get("/api/problems");
      setProblems(res.data);
    };
    fetchProblems();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problems.map((p) => (
        <ProblemCard key={p.id} problem={p} />
      ))}
    </div>
  );
};

export default Problems;
