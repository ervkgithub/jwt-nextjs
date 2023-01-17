import Users from "../../../models/Users";
import connectDb from "../../../middleware/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
var jwt = require("jsonwebtoken");

const KEY = "ffrgregegrgrefdsdewadewqadefefege";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    console.log("req.body api", req.body);
    try {
      let data = await Users.findOne({ email: req.body.email });
      if (data !== null) {
        if (data.password === req.body.password) {
          const { email, password } = req.body;
          res.status(200).json({
            token: jwt.sign(
              {
                data,
                email,
                password,
                admin: email === data.email && password === data.password,
              },
              KEY
            ),
          });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        res.status(400).json({ message: "User Not Found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Method not alloweed." });
  }
};

export default connectDb(handler);
