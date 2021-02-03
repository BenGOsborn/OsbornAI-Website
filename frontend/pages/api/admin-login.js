import cookie from 'cookie';
import axios from 'axios';

export default function AdminLogin(req, res) {
    axios.post('https://osbornai.herokuapp.com/admin/login', { username: req.body.username, password: req.body.password })
    .then((response) => {
        res.setHeader(
            "Set-Cookie", 
            cookie.serialize("token", response.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24,
                sameSite: "strict",
                path: "/"
            })
        );
        res.statusCode = 200; 
        res.json({ success: true });
    })
    .catch((err) => {
        res.statusCode = 400; 
        res.json({ success: false });
    });
};