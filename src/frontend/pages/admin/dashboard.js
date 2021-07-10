import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { parseDate } from "../../extras/helpers";

export default function Dashboard({
    redirect,
    token,
    inquiry_notifications,
    payments,
    payment_ids,
}) {
    const [inquiryNotifications, setInquiryNotifications] = React.useState(
        inquiry_notifications
    );
    const [paymentIds, setPaymentIds] = React.useState(payment_ids);

    const [identifier, setIdentifier] = useState(null);
    const [purchase, setPurchase] = useState(null);
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState("aud");

    const [newIdError, setNewIdError] = useState(false);

    const [displayCount, setDisplayCount] = useState(5);

    const router = useRouter();

    React.useEffect(() => {
        if (redirect) {
            router.push("/admin");
        }
    }, []);

    function component() {
        if (redirect) {
            return (
                <div className="container center">
                    <div className="container">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h4 style={{ color: "red" }}>Unauthenticated user!</h4>
                        <h5>Redirecting...</h5>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ paddingLeft: 80, paddingRight: 80 }}>
                    <br />
                    <br />
                    <div className="row">
                        <div className="container">
                            <div className="container">
                                <div className="col s12 m12 l6 center">
                                    <h5>Display count:</h5>
                                    <select
                                        className="browser-default"
                                        onChange={(e) => {
                                            setDisplayCount(e.target.value);
                                        }}
                                    >
                                        <option value={1}>1</option>
                                        <option value={5} selected="selected">
                                            5
                                        </option>
                                        <option value={10}>10</option>
                                        <option value={Infinity}>All</option>
                                    </select>
                                </div>
                                <div className="col s12 m12 l6 center">
                                    <h5>Logout:</h5>
                                    <button
                                        className="btn blue darken-1 waves-effect waves-light"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            axios
                                                .post("/api/admin/logout")
                                                .then((res) => {
                                                    router.push("/admin");
                                                })
                                                .catch((err) => {
                                                    console.log(
                                                        err.response.data
                                                    );
                                                });
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="row">
                        {/* Inquiry notifications */}
                        <div className="col s12 m12 l4">
                            <h4 className="center">
                                Inquiry notifications: (
                                {Math.max(
                                    0,
                                    inquiryNotifications.length - displayCount
                                )}{" "}
                                hidden)
                            </h4>
                            {inquiryNotifications.length === 0 ? (
                                <h5 className="center">
                                    There are no current inquiry notifications!
                                </h5>
                            ) : (
                                inquiryNotifications
                                    .slice(0, displayCount)
                                    .map((notification) => {
                                        return (
                                            <div
                                                key={notification._id}
                                                className="card"
                                            >
                                                <div className="card-content truncate">
                                                    <b>Name:</b>
                                                    <br />
                                                    {notification.first}{" "}
                                                    {notification.last}
                                                    <br />
                                                    <b>Email:</b>
                                                    <br />
                                                    {notification.email}
                                                    <br />
                                                    <b>Inquiry date:</b>
                                                    <br />
                                                    {parseDate(
                                                        notification.inquiry_date
                                                    )}
                                                    <br />
                                                    <b>Inquiry:</b>
                                                    <br />
                                                    {notification.inquiry}
                                                    <br />
                                                    <b>Total spent:</b>
                                                    <br />$
                                                    {notification.user_spent}
                                                    <br />
                                                    <b>Previous inquiries:</b>
                                                    <br />
                                                    <ul>
                                                        {notification.prev_inquiries
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    prev_inquiry,
                                                                    i
                                                                ) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                i
                                                                            }
                                                                            id={
                                                                                prev_inquiry._id
                                                                            }
                                                                        >
                                                                            <br />
                                                                            <div className="container">
                                                                                <b>
                                                                                    Previous
                                                                                    inquiry
                                                                                    date:
                                                                                </b>
                                                                                <br />
                                                                                {parseDate(
                                                                                    prev_inquiry.inquiry_date
                                                                                )}
                                                                                <br />
                                                                                <b>
                                                                                    Previous
                                                                                    inquiry:
                                                                                </b>
                                                                                <br />
                                                                                {
                                                                                    prev_inquiry.inquiry
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                    </ul>
                                                </div>
                                                <div className="card-action">
                                                    <button
                                                        className="btn blue darken-1 waves-effect waves-light"
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            axios
                                                                .post(
                                                                    "https://osbornai-backend.herokuapp.com/admin/delete_inquiry_notification",
                                                                    {
                                                                        token: token,
                                                                        inquiry_notification_id:
                                                                            notification._id,
                                                                    }
                                                                )
                                                                .then((res) => {
                                                                    const new_inquiry_notifications =
                                                                        inquiryNotifications.filter(
                                                                            (
                                                                                not
                                                                            ) =>
                                                                                not._id !==
                                                                                notification._id
                                                                        );
                                                                    setInquiryNotifications(
                                                                        new_inquiry_notifications
                                                                    );
                                                                })
                                                                .catch(
                                                                    (err) => {
                                                                        console.log(
                                                                            err
                                                                                .response
                                                                                .data
                                                                        );
                                                                    }
                                                                );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                        {/* Payments */}
                        <div className="col s12 m12 l4">
                            <h4 className="center">
                                Payments: (
                                {Math.max(0, payments.length - displayCount)}{" "}
                                hidden)
                            </h4>
                            {payments.length === 0 ? (
                                <h5 className="center">
                                    There are no payments to display!
                                </h5>
                            ) : (
                                payments
                                    .slice(0, displayCount)
                                    .map((payment) => {
                                        return (
                                            <div
                                                key={
                                                    payment.payment_id_details
                                                        ._id
                                                }
                                                className="card"
                                            >
                                                <div className="card-content truncate">
                                                    <b>Payment ID:</b>
                                                    <br />
                                                    {
                                                        payment
                                                            .payment_id_details
                                                            ._id
                                                    }
                                                    <br />
                                                    <b>
                                                        Payment creation date:
                                                    </b>
                                                    <br />
                                                    {parseDate(
                                                        payment
                                                            .payment_id_details
                                                            .timeCreated
                                                    )}
                                                    <br />
                                                    <b>Client email:</b>
                                                    <br />
                                                    {payment.stripe_token.email}
                                                    <br />
                                                    <b>Amount:</b>
                                                    <br />$
                                                    {
                                                        payment
                                                            .payment_id_details
                                                            .amount
                                                    }{" "}
                                                    {payment.payment_id_details.currency.toUpperCase()}
                                                    <br />
                                                    <b>Purchase date:</b>
                                                    <br />
                                                    {parseDate(
                                                        payment.charge.created *
                                                            1000
                                                    )}
                                                    <br />
                                                    <b>Purchase:</b>
                                                    <div
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                        }}
                                                    >
                                                        {
                                                            payment
                                                                .payment_id_details
                                                                .purchase
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                        {/* Payment IDs */}
                        <div className="col s12 m12 l4">
                            <h4 className="center">Create a new payment ID:</h4>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    axios
                                        .post(
                                            "https://osbornai-backend.herokuapp.com/admin/create_payment_id",
                                            {
                                                token: token,
                                                identifier: identifier,
                                                purchase: purchase,
                                                amount: amount,
                                                currency: currency,
                                            }
                                        )
                                        .then((res) => {
                                            const payment_details = [
                                                res.data.payment_details,
                                            ];
                                            const new_payment_ids = [
                                                ...payment_details,
                                                ...paymentIds,
                                            ];
                                            setNewIdError(false);
                                            e.target.reset();
                                            setPaymentIds(new_payment_ids);
                                        })
                                        .catch((err) => {
                                            console.log(err.response.data);
                                            setNewIdError(true);
                                        });
                                }}
                                id="createPaymentId"
                            >
                                <div className="input-field">
                                    <input
                                        type="text"
                                        placeholder="Identifier"
                                        required={true}
                                        onChange={(e) => {
                                            setIdentifier(e.target.value);
                                        }}
                                    />
                                    <textarea
                                        className="materialize-textarea"
                                        placeholder="Purchase"
                                        required={true}
                                        onChange={(e) => {
                                            setPurchase(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="number"
                                        min={1}
                                        step={0.01}
                                        placeholder="Amount"
                                        required={true}
                                        onChange={(e) => {
                                            setAmount(
                                                Math.max(1, e.target.value)
                                            );
                                        }}
                                    />
                                    <select
                                        className="browser-default"
                                        onChange={(e) => {
                                            setCurrency(e.target.value);
                                        }}
                                    >
                                        <option value="aud" selected="selected">
                                            AUD
                                        </option>
                                        <option value="usd">USD</option>
                                    </select>
                                </div>
                            </form>
                            <button
                                className="btn blue darken-1 waves-effect waves-light"
                                type="submit"
                                form="createPaymentId"
                            >
                                Create
                            </button>
                            <br />
                            {newIdError !== true ? (
                                <br />
                            ) : (
                                <p style={{ color: "red" }}>
                                    Could not create a new payment ID! Please
                                    try again.
                                </p>
                            )}
                            <h4 className="center">
                                Payment IDs: (
                                {Math.max(0, paymentIds.length - displayCount)}{" "}
                                hidden)
                            </h4>
                            {paymentIds.length === 0 ? (
                                <h5 className="center">
                                    {"There are no active payment ID's!"}
                                </h5>
                            ) : (
                                paymentIds
                                    .slice(0, displayCount)
                                    .map((payment_id) => {
                                        const href = `/pay/${payment_id._id}`;
                                        const payment_url =
                                            process.env.siteURL + href;

                                        return (
                                            <div
                                                key={payment_id._id}
                                                className="card"
                                            >
                                                <div className="card-content truncate">
                                                    <b>Payment URL:</b>
                                                    <br />
                                                    <Link href="/">
                                                        <a
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigator.clipboard.writeText(
                                                                    payment_url
                                                                );
                                                                window.M.toast({
                                                                    html: "Copied URL to clipboard!",
                                                                    displayLength: 1000,
                                                                });
                                                            }}
                                                        >
                                                            {payment_url}
                                                        </a>
                                                    </Link>
                                                    <br />
                                                    <b>Payment ID:</b>
                                                    <br />
                                                    {payment_id._id}
                                                    <br />
                                                    <b>Identifier:</b>
                                                    <br />
                                                    {payment_id.identifier}
                                                    <br />
                                                    <b>Name:</b>
                                                    <br />
                                                    {payment_id.name}
                                                    <br />
                                                    <b>Purchase:</b>
                                                    <div
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                        }}
                                                    >
                                                        {payment_id.purchase}
                                                    </div>
                                                    <b>Amount:</b>
                                                    <br />${payment_id.amount}
                                                    <br />
                                                    <b>Currency:</b>
                                                    <br />
                                                    {payment_id.currency.toUpperCase()}
                                                    <br />
                                                    <b>
                                                        Payment creation date:
                                                    </b>
                                                    <br />
                                                    {parseDate(
                                                        payment_id.timeCreated
                                                    )}
                                                    <br />
                                                    <b>Expiry:</b>
                                                    <br />
                                                    {parseInt(
                                                        (new Date(
                                                            payment_id.expiry
                                                        ) -
                                                            new Date().getTime()) /
                                                            8.64e7
                                                    ) + 1}{" "}
                                                    days
                                                </div>
                                                <div className="card-action">
                                                    <button
                                                        className="btn blue darken-1 waves-effect waves-light"
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            axios
                                                                .post(
                                                                    "https://osbornai-backend.herokuapp.com/admin/delete_payment_id",
                                                                    {
                                                                        token: token,
                                                                        payment_id:
                                                                            payment_id._id,
                                                                    }
                                                                )
                                                                .then((res) => {
                                                                    const new_payment_ids =
                                                                        paymentIds.filter(
                                                                            (
                                                                                not
                                                                            ) =>
                                                                                not._id !==
                                                                                payment_id._id
                                                                        );
                                                                    setPaymentIds(
                                                                        new_payment_ids
                                                                    );
                                                                })
                                                                .catch(
                                                                    (err) => {
                                                                        console.log(
                                                                            err
                                                                                .response
                                                                                .data
                                                                        );
                                                                    }
                                                                );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            );
        }
    }

    return (
        <div className="Dashboard">
            <Head>
                <title key="title">Admin Dashboard - OsbornAI</title>
                <meta
                    name="description"
                    content="The admin dashboard containing information regarding our clients and our business."
                    key="description"
                />
                <meta
                    name="keywords"
                    content="admin, dashboard, osbornai, inquiry, notifications, payments, payment id, logout, new payment id, identifier"
                    key="keywords"
                />
                <meta name="robots" content="noindex, nofollow" key="robots" />

                <meta
                    property="og:title"
                    content="Admin Dashboard - OsbornAI"
                    key="ogTitle"
                />
                <meta
                    property="og:description"
                    content="The admin dashboard containing information regarding our clients and our business."
                    key="ogDescription"
                />

                <meta
                    name="twitter:title"
                    content="Admin Dashboard - OsbornAI"
                    key="twitterTitle"
                />
                <meta
                    name="twitter:description"
                    content="The admin dashboard containing information regarding our clients and our business."
                    key="twitterDescription"
                />
            </Head>
            {component()}
        </div>
    );
}

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token;

    const return_form = {
        redirect: true,
        token: null,
        inquiry_notifications: [],
        payments: [],
        payment_ids: [],
    };

    if (!token) {
        return { props: return_form };
    } else {
        return_form.token = token;
    }

    try {
        await axios.post(
            "https://osbornai-backend.herokuapp.com/admin/validate_token",
            { token: token }
        );
        return_form.redirect = false;
    } catch {
        return { props: return_form };
    }

    try {
        const inquiry_notifications_response = await axios.post(
            "https://osbornai-backend.herokuapp.com/admin/view_inquiry_notifications",
            { token: token }
        );
        return_form.inquiry_notifications =
            inquiry_notifications_response.data.inquiry_notifications;
    } catch {}

    try {
        const payments_response = await axios.post(
            "https://osbornai-backend.herokuapp.com/admin/view_payments",
            { token: token }
        );
        return_form.payments = payments_response.data.payments;
    } catch {}

    try {
        const payment_ids_response = await axios.post(
            "https://osbornai-backend.herokuapp.com/admin/view_valid_payment_ids",
            { token: token }
        );
        return_form.payment_ids = payment_ids_response.data.payment_ids;
    } catch {}

    return {
        props: { ...return_form },
    };
}
