import axios from 'axios';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token;

    console.log(token);

    try {
        await axios.post('https://osbornai.herokuapp.com/admin/validate_token', { token: token });
        const inquiry_notification_response = await axios.post('https://osbornai.herokuapp.com/admin/view_inquiry_notifications', { token: token });
        const view_payments_response = await axios.get('https://osbornai.herokuapp.com/admin/view_payments', { token: token });
        const view_payment_ids = await axios.get('https://osbornai.herokuapp.com/admin/view_valid_payment_ids', { token: token });

        return { 
            props: { 
                redirect: false, 
                inquiry_notifications: inquiry_notification_response.data.inquiry_notifications,
            } 
        };

    } catch {

    };
};