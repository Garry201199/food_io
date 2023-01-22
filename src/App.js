import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import CreateContainer from "./Component/CreateContainer";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./Component/Auth/LoginPage";
import SignUpPage from "./Component/Auth/SignUpPage";
import ForgotPassword from "./Component/Auth/ForgotPassword";
import { AuthcontextProvider } from "./Context/AuthContext";
import ProtectedRoutes from "./Component/Auth/ProtectedRoutes";
import MainContainer from "./Component/MainContainer";
function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <AuthcontextProvider>
        <div className="w-screen select-none  flex flex-col ">
          <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<>
                <Header/>
                <MainContainer />
                </>} />
                <Route path="/createItem" element={
                  <>
                  <Header/>
                  <CreateContainer />
                  </>
                
                } />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </AuthcontextProvider>
    </AnimatePresence>
  );
}

export default App;
