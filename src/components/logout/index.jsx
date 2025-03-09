import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../store/actions/authActions";
import { notification } from "antd";

function Logout() {
  const isLogin = useSelector((state) => state.authReducer);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const handleClick = () => {
    api["success"]({
      message: "Đăng xuất thành công!",
      description: "Vui lòng đợi trong giây lát",
    });
    setTimeout(() => {
      dispatch(LOGOUT());
    }, 1500);
  };

  return (
    <>
      {contextHolder}
      <button onClick={handleClick} className="btn btn-log">
        Logout
      </button>
    </>
  );
}

export default Logout;
