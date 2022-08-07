import React from "react";
import { useGlobalContext } from "../../context";
import "./DashboardUsers.css";

const DashboardUsers = () => {
  const { users } = useGlobalContext();

  return (
    <>
      <h1>Number of Users:{users.length}</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Job</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  {user.lastName} {user.firstName}
                </td>
                <td>{user.age} years old</td>
                <td>{user.gender}</td>
                <td>{user.job}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DashboardUsers;
