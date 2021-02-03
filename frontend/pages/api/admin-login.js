import cookie from 'cookie';
import axios from 'axios';

export default function AdminLogin(req, res) {
    axios.post('https://osbornai.herokuapp.com/admin/login', { username: req.body.username, password: req.body.password }).then((res) => console.log(res.data)).catch((err) => console.log(err.response));

    // res.setHeader(
    //     "Set-Cookie", 
    //     cookie.serialize("token", "IAMATOKEN", {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV !== 'development',
    //         maxAge: 60 * 60 * 24,
    //         sameSite: "strict",
    //         path: "/"
    //     })
    // );
    res.statusCode = 200; 
    res.json({ success: true });
};