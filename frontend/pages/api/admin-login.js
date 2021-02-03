import cookie from 'cookie';
import axios from 'axios';
import FormData from 'form-data';

export default function AdminLogin(req, res) {

    const form = new FormData();
    form.append('username', 'Ben');
    form.append('password', 'Pass');
    axios.post('http://127.0.0.1:5000', form).then((res) => console.log(res.data)).catch((err) => console.log(err.response));

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