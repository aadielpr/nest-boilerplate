export default {
    schema: "./src/providers/drizzle/_schemas/*",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.PG_URL,
    },
};
