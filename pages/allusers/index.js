import Table from "react-bootstrap/Table";
import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async () => {
  const res = await fetch(process.env.BASE_URL + "api/users/alluser");
  const data = await res.json();
  return {
    props: { data: data },
  };
};

const handleDelete = async (id) => {
  var url = `http://localhost:3000/api/users/${id}`;
  console.log("deleteddd id", id);
  await axios
    .delete(url)
    .then((response) => console.log("Delete successful"))
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

const AllUsers = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <div className="mt-5">
      <>
        <h2>All User List</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#UserId</th>
              <th>User Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item._id} id={item.userid}>
                  <td>{item.userid}</td>
                  <td>{item.username}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    </div>
  );
};

export default AllUsers;
