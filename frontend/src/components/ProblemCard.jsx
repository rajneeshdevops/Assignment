import { Link } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {problem.imageUrl && (
        <img src={problem.imageUrl} alt="problem" className="rounded mb-2" />
      )}
      <h3 className="font-bold text-lg">{problem.title}</h3>
      <p className="text-sm text-gray-600">{problem.location}</p>
      <p className="mt-2 line-clamp-3">{problem.description}</p>
      <Link
        to={`/problems/${problem.id}`}
        className="text-blue-600 mt-2 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ProblemCard;
