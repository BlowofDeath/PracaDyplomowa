export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://sep-praca-dyplomowa.herokuapp.com"
    : "http://localhost:4001";
