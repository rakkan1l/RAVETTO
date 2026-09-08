import { app } from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  RAVETTO Atelier E-Commerce Server`);
  console.log(`  Environment: ${env.NODE_ENV}`);
  console.log(`  Listening on: http://localhost:${PORT}`);
  console.log(`  API Base:     http://localhost:${PORT}/api/v1`);
  console.log(`======================================================\n`);
});
