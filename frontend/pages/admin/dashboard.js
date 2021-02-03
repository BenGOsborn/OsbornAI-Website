import axios from 'axios';

export default function Dashboard({ redirect, inquiry_notifications, payments, payment_ids }) {
    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token;

    // try {
    //     await axios.post('http://127.0.0.1:5000/admin/validate_token', { token: token });
    // } catch (err) {
    //     console.log(1);
    //     console.log(err.response.data);
    // }

    try {

        const inquiry_notification_response = await axios.post('http://127.0.0.1:5000/admin/view_inquiry_notifications', { token: token });
    } catch (err) {
        console.log(2);
        console.log(err.response.data);
    }

    // try {
    //     const payments_response = await axios.get('https://osbornai.herokuapp.com/admin/view_payments', { token: token });
    // } catch (err) {
    //     console.log(3);
    //     console.log(err.response.data);

    // }

    // try {
    //     const payment_ids_response = await axios.get('https://osbornai.herokuapp.com/admin/view_valid_payment_ids', { token: token });
    // } catch (err) {
    //     console.log(4);
    //     console.log(err.response.data);
    // }

    return { 
        props: { 
            redirect: false, 
        } 
    };

};