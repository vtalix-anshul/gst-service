require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.GST_PORT || 3006;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});