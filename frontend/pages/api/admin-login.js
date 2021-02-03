import cookie from 'cookie';
import axios from 'axios';
import FormData from 'form-data';

export default function AdminLogin(req, res) {

    const form = new FormData();
    form.append('username', 'Ben');
    form.append('password', 'Pass');

    const form_2 = {username: 'Ben', password: 'Pass'};

    axios.post('https://osbornai.herokuapp.com/admin/login', form_2).then((res) => console.log(res.data)).catch((err) => console.log(err.response));

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