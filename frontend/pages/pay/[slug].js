import axios from 'axios';

export default function Payment(props) {
    return (
        <h1>Hello</h1>
    );
};

export async function getStaticPaths() {
    try {
        const payment_ids_response = await axios.post('https://osbornai.herokuapp.com/view_valid_payment_ids');
        const payment_ids = payment_ids_response.data.payment_ids;

        const paths = payment_ids.map(payment_id => ({
            params: {
                slug: payment_id
            }
        }));

        return {
            paths,
            fallback: false
        };

    } catch {

    }
};

export async function getStaticProps({ params: { slug } }) {
    try {
        const payment_id_details_response = await axios.post('https://osbornai.herokuapp.com/load_payment_id', { payment_id: slug });
    } catch {
        
    }

    return {
        props: {

        }
    };
};