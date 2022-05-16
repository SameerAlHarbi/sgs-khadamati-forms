import App from "./app";
import FormsController from "./controllers/forms.controller";

const PORT: number = +(process.env.PORT ?? 9000);
const app = new App([new FormsController()], PORT);

app.listen();
