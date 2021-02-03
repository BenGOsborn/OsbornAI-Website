// import cookie from 'cookie';
// import axios from 'axios';

// export default async function LastInquiry(req, res) {
//     try {
//         const response = await axios.post('https://osbornai.herokuapp.com/add_inquiry', { });

//         res.setHeader(
//             "Set-Cookie", 
//             cookie.serialize("", , {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV !== 'development',
//                 maxAge: 60 * 60 * 24,
//                 sameSite: "strict",
//                 path: "/"
//             })
//         );
//         res.statusCode = 200; 
//         res.json({ success: true });
//     } catch {
//         res.statusCode = 400; 
//         res.json({ success: false });
//     }
// };