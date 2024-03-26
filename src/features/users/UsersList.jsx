import { LoadingSpinner } from "../../app/components/LoadingSpinner";
import ForbiddenPage from "../errors/ForbiddenPage";
import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.email}</li>;
          })}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    if(error.status === 403){
      content = <ForbiddenPage/>
    } else {
      content = <p>{JSON.stringify(error)}</p>;
    }
    
  }

  return content;
};
export default UsersList;
