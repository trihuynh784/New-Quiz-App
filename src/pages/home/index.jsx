import { Link } from "react-router-dom";
import "./home.scss";

function HomePage() {
  return (
    <>
      <div className="container">
        <div className="home">
          <h4 className="home__title">
            Chúc mừng bạn đã đăng nhập thành công!
          </h4>
          <Link className="link-btn" to="/topics">
            Danh sách các chủ đề ôn luyện
          </Link>
          <Link className="link-btn" to="/answers">
            Danh sách các bài đã luyện tập
          </Link>
          <hr />
          <p className="home__desc">
            Website trắc nghiệm online lập trình Frontend là một nền tảng trực
            tuyến cho phép các lập trình viên Frontend thực hiện các bài kiểm
            tra, trắc nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh
            vực lập trình Frontend.
          </p>
          <p className="home__desc">
            Đối với các lập trình viên Frontend, website trắc nghiệm online cung
            cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của
            mình trong các công nghệ và công cụ lập trình như HTML, CSS,
            Javascript, jQuery, Bootstrap, Angular, React, Vue,...
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
