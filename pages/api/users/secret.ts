
import { NextApiRequest, NextApiResponse } from "next";
var jwt = require('jsonwebtoken');

const KEY = "ffrgregegrgrefdsdewadewqadefefege";

export default function (req:NextApiRequest, res:NextApiResponse){
    const {token} = req.body;
    const { admin } = jwt.verify(token, KEY);
    if(admin){
        res.json({secretAdminCode:12345});
    }
    else{
        res.json({admin:false});
    }
    
}