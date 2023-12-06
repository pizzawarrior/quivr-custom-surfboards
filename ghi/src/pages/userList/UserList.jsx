import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllAccountsQuery, useGetTokenQuery } from "../../app/authSlice";
import UserRow from "../../components/userRow/UserRow";
import { Table } from "../../constants";
import { ImgBackground } from "./style";

const UserList = () => {
  let { data: allUsers } = useGetAllAccountsQuery();
  const { data: account, isLoading } = useGetTokenQuery();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (!isLoading && !account) {
      navigate("/");
    }
    if (!isLoading && account.role === "customer") {
      navigate("/create-order");
    }
    if (allUsers && !isLoading) {
      if (account.role === "shaper") {
        let filtered = allUsers.filter((item) => item.role === "customer");
        setUserList(filtered);
      } else {
        setUserList(allUsers);
      }
    }
  }, [account, allUsers, isLoading, navigate]);

  return (
    <>
      <ImgBackground>
        {account && (
          <Table>
            <thead>
              <tr>
                <th>
                  {account.role === "shaper" ? "Customer Name" : "User Name"}
                </th>
                {account.role === "shaper" ? (
                  <>
                    <th>Orders In Progress</th>
                    <th>Completed Orders</th>
                  </>
                ) : (
                  <th>User Type</th>
                )}
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, index) => (
                <UserRow item={item} role={account.role} key={index} />
              ))}
            </tbody>
          </Table>
        )}
      </ImgBackground>
    </>
  );
};

export default UserList;
