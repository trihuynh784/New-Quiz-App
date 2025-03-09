import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivatePages() {
  const isLogin = useSelector(state => state.authReducer);

  return (
    <>
      {isLogin ? (<><Outlet /></>) : (<><Navigate to="/login" /></>)}
    </>
  )
}

export default PrivatePages;