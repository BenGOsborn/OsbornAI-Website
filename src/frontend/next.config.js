module.exports = {
    env: {
        STRIPE_KEY: process.env.STRIPE_KEY,
    },
    siteURL:
        process.env.NODE_ENV !== "production"
            ? "http://localhost:300"
            : "https://osbornai-frontend.herokuapp.com",
};
