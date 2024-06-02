import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const MainLayout = () => {
  return (
    <div className="main_layout">
      <Header />
      <main className="main_content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
