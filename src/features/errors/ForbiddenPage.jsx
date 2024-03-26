import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back one step
  };

  return (
    <div className="forbidden" style={{ textAlign: "center" }}>
      <h1>403 Forbidden</h1>
      <p>Sorry, you don't have permission to access this page.</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default ForbiddenPage;
