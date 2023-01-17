import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
var router;
var jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

const login = (req, res) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("You are not Logged in");
  const [secret, setSecret] = useState("");
  router = useRouter();

  if (typeof window !== "undefined" && typeof window !== null) {
    let jwtSecret = localStorage.getItem("jwtSecret");
    let jwtAdmin = localStorage.getItem("jwtAdmin");
    if(jwtSecret !== null && jwtAdmin !== null){
    const decrypSecCode = cryptr.decrypt(jwtSecret);
    const decrypAdmin = cryptr.decrypt(jwtAdmin);
    // console.log("decrypSecCode + decrypAdmin", decrypSecCode, decrypAdmin)
    if (decrypSecCode === "12345" && decrypAdmin === "true") {
      router.push("/dashboard");
    }
  }
  }

  async function handleLogin() {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((t) => t.json());
    console.log("res", res);
    const token = res.token;
    if (token) {
      const json = jwt.decode(token);
      setMessage(
        `Welcome ${json.email} and you are ${
          json.admin ? "an admin" : "not an admin"
        }`
      );
      const res = await fetch("/api/users/secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then((t) => t.json());
      console.log("login check", email, password, json.email, json.password);
      console.log("json", json);
      if (email === json.email && password === json.password) {
        setSecret(res.secretAdminCode);
        console.log(res.secretAdminCode);
        const cryptrSecCode = cryptr.encrypt(res.secretAdminCode);
        const cryptrAdmin = cryptr.encrypt(json.admin);
        localStorage.setItem("jwtSecret", cryptrSecCode);
        localStorage.setItem("jwtAdmin", cryptrAdmin);
        router.push("/dashboard");
      } else {
        setSecret("Nothing available");
      }
    } else {
      setMessage(res.message);
    }
  }

  return (
    <>
      <Row>
        <h2 className="mt-4">{message}</h2>
        <h2>Secret: {secret}</h2>
        <Col xs={4}>
          <Form className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPass">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleLogin}>
              Login
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/register">
              <Button variant="primary">New User Register here ?</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default login;
