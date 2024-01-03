import "./App.css";
import Task from './components/Task'
import AddTask from "./components/AddTask";
import Home from "./components/Pages/Home";
import { Route, Routes } from "react-router-dom";
import Singup from "./components/Pages/Singup";
import VerifyEmail from "./components/Pages/VerifyEmail";
import LoginPage from "./components/Pages/LoginPage";
import Navbar from "./components/smallComponents/Navbar";
import OperRoute from "./components/Routes/OperRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const {signupData} = useSelector((state)=>state.auth);
  return (
    <main className="bg-[#020206] w-full h-screen overflow-auto flex justify-center items-center  ">

      <div className="w-full h-screen overflow-auto rounded-lg shadow-2xl  md:shadow-xl ">
      <Navbar/>
        <Routes>
           
            <Route path="/" element={
            // <OperRoute>
              <Home/>
              // </OperRoute>
            }></Route>
            <Route path="/tasks" element={<PrivateRoute><Task></Task></PrivateRoute>}></Route>
            <Route path="/add-task" element={<PrivateRoute><AddTask/></PrivateRoute> }></Route>
            <Route path="/sign-up" element={<Singup/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
           { signupData && <Route path="/verify-email" element={<VerifyEmail/>}></Route>}
        </Routes>
      </div>
      
    </main>
  );
}

export default App;