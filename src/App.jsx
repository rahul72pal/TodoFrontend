import "./App.css";
import Task from './components/Task.jsx'
import AddTask from "./components/AddTask.jsx";
import Home from "./components/Pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Singup from "./components/Pages/Singup.jsx";
import VerifyEmail from "./components/Pages/VerifyEmail.jsx";
import LoginPage from "./components/Pages/LoginPage.jsx";
import Navbar from "./components/smallComponents/Navbar.jsx";
import OperRoute from "./components/Routes/OperRoute";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import { useSelector } from "react-redux";
import HardChallange from "./components/Pages/HardChallange.jsx";
import ChallengePage from "./components/Pages/ChallengePage.jsx";
import ChallengeTasks from "./components/Pages/ChallengeTasks.jsx";


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
            <Route path="/tasks" element={<PrivateRoute><Task/></PrivateRoute>}></Route>
            <Route path="/add-task" element={<PrivateRoute><AddTask/></PrivateRoute> }></Route>
            <Route path="/challenge" element={<PrivateRoute><HardChallange/></PrivateRoute> }></Route>
            <Route path="/challenge/:challengeId" element={<PrivateRoute><ChallengeTasks/></PrivateRoute> }></Route>
            <Route path="/challenge-page" element={<PrivateRoute><ChallengePage/></PrivateRoute> }></Route>
            <Route path="/sign-up" element={<Singup/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
           { signupData && <Route path="/verify-email" element={<VerifyEmail/>}></Route>}
        </Routes>
      </div>
      
    </main>
  );
}

export default App;