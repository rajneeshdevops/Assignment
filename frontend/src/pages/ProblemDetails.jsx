import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { ThumbsUp, MessageSquare } from "lucide-react";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [newSolution, setNewSolution] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const problemRes = await API.get(`/api/problems/${id}`);
      const solutionsRes = await API.get(`/api/problems/${id}/solutions`);
      setProblem(problemRes.data);
      setSolutions(solutionsRes.data);
    };
    fetchData();
  }, [id]);

  const handleAddSolution = async () => {
    if (!newSolution.trim()) return;
    const res = await API.post(`/api/problems/${id}/solutions`, {
      content: newSolution,
    });
    setSolutions([...solutions, res.data]);
    setNewSolution("");
  };

  const handleUpvote = async (solutionId) => {
    const res = await API.post(`/api/solutions/${solutionId}/upvote`);
    setSolutions(solutions.map(s => s.id === solutionId ? res.data : s));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Problem Details */}
      {problem && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <p className="text-gray-600 mt-2">{problem.description}</p>
          <div className="mt-3 flex gap-2">
            {problem.tags?.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Solutions */}
      <h2 className="text-xl font-semibold mb-3">Solutions</h2>
      <div className="space-y-4">
        {solutions.map((sol) => (
          <div key={sol.id} className="p-4 bg-white rounded-xl shadow">
            <p>{sol.content}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <button onClick={() => handleUpvote(sol.id)} className="flex items-center gap-1 text-green-600">
                <ThumbsUp size={16} /> {sol.upvotes}
              </button>
              <span className="flex items-center gap-1">
                <MessageSquare size={16} /> {sol.comments?.length || 0} Comments
              </span>
            </div>

            {/* Comments */}
            <div className="mt-3 pl-4 border-l space-y-2">
              {sol.comments?.map((c, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-semibold">{c.user}</span>: {c.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Solution */}
      <div className="mt-6">
        <textarea
          value={newSolution}
          onChange={(e) => setNewSolution(e.target.value)}
          placeholder="Write your solution..."
          className="w-full p-3 border rounded-xl"
        />
        <button
          onClick={handleAddSolution}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Submit Solution
        </button>
      </div>
    </div>
  );
};

export default ProblemDetails;
