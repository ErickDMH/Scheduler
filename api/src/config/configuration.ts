export default () => ({
  expandVariables: true,
  isGlobal: true,
  port: parseInt(process.env.API_PORT, 10) || 4500,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    name: process.env.DATABASE_NAME || 'scheduler',
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || '4Adm1!n',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
  jwt: process.env.JWT_SECRET || 'lOnKGMxHE^xlFa#K684*7g',
});

interface DatabaseConfig {
  host: string;
  name: string;
  user: string;
  password: string;
  port: number;
}
