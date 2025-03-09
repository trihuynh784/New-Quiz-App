import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./layoutDefault.scss";
import Header from "../../components/header";

const { Content, Footer } = Layout;

function LayoutDefault() {
  return (
    <div className="wrapper">
      <Layout>
        <header className="header">
          <Header />
        </header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">Nocopyright @ 2025 by mtrivjppro</Footer>
      </Layout>
    </div>
  )
}

export default LayoutDefault;