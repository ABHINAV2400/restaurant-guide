import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`Server is running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();