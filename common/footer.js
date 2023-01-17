import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';

const Footer = () => {

  const router = useRouter();

  const [loginStatus, setLoginStatus] = useState();
  useEffect(() => {
    setLoginStatus(localStorage.getItem("loginStatus"));
   // console.log(loginStatus);
  });

  const logoutFn = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    router.reload('/courses');
  };

  return (
    <>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/alluser">
                  All user
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/register">
                  Register
                </Link>
              </li>
              {!loginStatus && (
              <>  
              <li className="nav-item">
              <Link className="nav-link" href="/login">
                Login
              </Link>
            </li>  
              </>
               )}
               {loginStatus && (
              <>  
              <li className="nav-item">
                <Link className="nav-link" href="#" onClick={logoutFn}>
                  Logout
                </Link>
              </li>
              </>
               )}
        </ul>
        <p className="text-center text-muted">© 2022 Company, Altudo</p>
      </footer>
    </>
  );
};

export default Footer;
