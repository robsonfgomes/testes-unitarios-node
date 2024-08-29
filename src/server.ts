import { App } from './app';

const PORT = 8080;

new App().server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
