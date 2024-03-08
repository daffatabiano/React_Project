import axios from "axios";
import Navbar from "../components/Navbar";
import "../style/home.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const Home = () => {
  const [user, setUser] = useState([]);
  const perPage = 7;
  const getUser = () =>{
    axios
    .get("https://reqres.in/api/users", {
      params: {
        per_page: perPage,
      }
    })
    .then((res) => {
      setUser(res.data.data);
    })
    .catch((err) => {
      console.log(err.response);
    })
  }

  useEffect(() => {
    getUser();
  },[])
  console.log(getUser);

  return (
    <div>
        <Navbar />
        <header>
         <div className="cardContainer">
            <div className="card"  >
              <Modal />
            <img className="card-img" src="https://almuhtada.org/wp-content/uploads/2024/01/Sifat-Orang-Munafik.jpg" alt="" />
              <div className="bodyCard">
            <p>My Story</p>
            <button  data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn rounded-circle m-auto">+</button>
              </div>
            </div>

          {user.map((item) => (
            <>
            <Modal />
            <Link className="card"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img className="card-img" src={item.avatar} alt={item.last_name} />
              <div className="bodyCard2">
            <Link className="btn rounded-circle">
              <img className="img-fluid" src={item.avatar} alt={item.last_name} />
            </Link>
            <em className="">{`${item.first_name} ${item.last_name}`}</em>
              </div>
            </Link>
            </>
          ))}
            </div>
        </header>
        </div>
  )
}

export default Home;