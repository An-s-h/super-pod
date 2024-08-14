  // App.js
  import React, { useEffect } from "react";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import MainLayout from "./layout/MainLayout";
  import Home from "./pages/Home";
  import AuthLayout from "./layout/AuthLayout";
  import SignUp from "./pages/SignUp";
  import Login from "./pages/Login";
  import Categories from "./pages/Categories";
  import Profile from "./pages/Profile";
  import axios from "axios";
  import { useDispatch } from "react-redux";
  import { authActions } from "./store/auth";
  import AddPodcast from "./pages/AddPodcast";
  import AllPodcasts from "./pages/AllPodcasts"
import CategoriesPage from "./pages/CategoriesPage";
import DescriptionPage from "./pages/DescriptionPage";
import NotFound from "./pages/NotFound";



  const App = () => {
    const dispatch=useDispatch();
    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await axios.get("https://super-pod-backend.vercel.app/api/v1/check-cookie", {
            withCredentials: true
          });
    
          if (res.data.isLoggedIn) {
            dispatch(authActions.login());
          } else {
            dispatch(authActions.logout());
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }, [dispatch]);
    

    return (
      <div className="">
        <Router>
          <Routes>
          <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<MainLayout />}>
              {" "}
              <Route index element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-podcast" element={<AddPodcast />} />
              <Route path="/all-podcasts" element={<AllPodcasts />} />
              <Route path="/categories/:cat" element={<CategoriesPage />} />
              <Route path="/description/:id" element={<DescriptionPage/>} />
            </Route>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </div>
    );
  };

  export default App;
