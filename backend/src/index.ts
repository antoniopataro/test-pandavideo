import { App } from "./app";

const app = new App();

app.setupMiddlewares();
app.setupRoutes();

app.listen();
