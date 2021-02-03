import axios from 'axios';

export default function Dashboard({ redirect, inquiry_notifications, payments, payment_ids }) {
    console.log(redirect);

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token;

    try {
        await axios.post('https://osbornai.herokuapp.com/admin/validate_token', { token: token });
        const inquiry_notification_response = await axios.get('https://osbornai.herokuapp.com/admin/view_inquiry_notifications', { token: token });
        const payments_response = await axios.get('https://osbornai.herokuapp.com/admin/view_payments', { token: token });
        const payment_ids_response = await axios.get('https://osbornai.herokuapp.com/admin/view_valid_payment_ids', { token: token });

        return { 
            props: { 
                redirect: false, 
                inquiry_notifications: inquiry_notification_response.data.inquiry_notifications,
                payments: payments_response.data.payments,
                payment_ids: payment_ids_response.data.payment_ids
            } 
        };

    } catch (err) {
        console.log(err);
        return {
            props: {
                redirect: true,
                inquiry_notifications: [],
                payments: [],
                payment_ids: []
            }
        };
    };
};