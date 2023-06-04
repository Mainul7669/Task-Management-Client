import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center mt-5">
      <img
        src="https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif"
        alt="404"
        className="img-fluid mb-4"
        style={{ maxWidth: '400px' }}
      />
      <Link to="/" className="btn btn-danger">Back to Home</Link>
    </div>
  );
};

export default NotFound;
