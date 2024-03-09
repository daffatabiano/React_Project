import React from 'react';
import axios from 'axios';

const ListUsers = () => {
    const navigate = useNavigate();
    const [ListUsers, setListUsers] = useState([]);
    const [page, setPage] = useState({
        page: 0,
        per_page: 6,
        total: 12,
        total_pages: 2,
    });

    const getListUsers = () => {
        axios
          .get("https://reqres.in/api/users")
          .then((res) => {
            setListUsers(res.data.data);
          })
          .catch((err) => {
            console.log(err.response);
          })


    }
  return (
    <div>
      <h1>List Friends</h1>
    </div>
  )
}

export default ListUsers