import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
};

export default Root;
