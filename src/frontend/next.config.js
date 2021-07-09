module.exports = {
    env: {
        STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
        STRIPE_PUBLIC_TEST: process.env.STRIPE_PUBLIC_TEST,
        siteURL:
            process.env.NODE_ENV !== "production"
                ? "http://localhost:3000"
                : "https://osbornai-frontend.herokuapp.com",
    },
};
