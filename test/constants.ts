import 'dotenv/config';

export const app = `http://localhost:${process.env.PORT_APP}/`;
export const database = process.env.MONGO_URI;
export const timer = 30000;
