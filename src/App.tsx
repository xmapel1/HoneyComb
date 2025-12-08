import { createHashRouter, Link, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import "./style/gallery.css";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Gallery />, path: "/" },
        { element: <About />, path: "/about" },
      ],
      element: (
        <>
          <nav className="navbar">
            <div className="logo">Typescript/React Pinterest Clone</div>
            <div className="nav-links">
              <Link to="/">Gallery</Link>
              <Link to="/about">About</Link>
            </div>
          </nav>
          <Outlet />
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;