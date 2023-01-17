import Users from "../../../models/Users";
import connectDb from "../../../middleware/mongoose";
// var md5 = require('md5');
const handler = async(req, res) => {
    if(req.method == 'POST') {
        console.log(req.body);
        try{
            let temp = new Users({
                userid: (parseInt(Math.random()*100000000).toString()),
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password
            })
            const response = await temp.save();
            res.status(201).json(response);
        }
        catch(err){
            res.status(400).json({message: err.message})
        }        
    }
    else {
        res.status(400).json({message: 'Method not alloweed.'})
    }
}

export default connectDb(handler);