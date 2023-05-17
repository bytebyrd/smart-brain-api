require('./load-env');
const express = require('express');
const router = require('./routes');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/", router);




app.listen(PORT, () => {
    console.log(`Server is up, running on port:${PORT}`);
})

