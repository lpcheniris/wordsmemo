import { app } from "./app";

const port = 8001;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));