import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

const Header = () => {

  const router = useRouter();

  const [loginStatus, setLoginStatus] = useState();

 if (typeof window !== "undefined") {
    let jwtAdmin = localStorage.getItem("jwtAdmin");
    if(jwtAdmin !== null){
    const decrypAdmin = cryptr.decrypt(jwtAdmin);
    setLoginStatus(decrypAdmin);
    console.log("loginStatus", loginStatus);
  }
 }

  const logoutFn = () => {
    localStorage.removeItem("jwtAdmin");
    localStorage.removeItem("jwtSecret");
    router.push('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ borderBottom: '4px solid #ffbc00' }}>
        <div className="container-fluid">
            <Link className="navbar-brand" aria-current="page" href="/">
              <img src="/altudo-logo.png" width="200" />
            </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/allusers">
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
