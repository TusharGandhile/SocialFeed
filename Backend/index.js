const express = require("express");
const app = express();
const authFeedRouter = require("./routers/feed");
const authUserRouter = require("./routers/user");
const mongoose = require("mongoose");
const bodyParser=require("body-parser")
const dotenv = require("dotenv");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path=require("path")
const io= require("socket.io")(server,{cors:{origin:"*"}})
const cors = require("cors")
dotenv.config();
app.use(express.json());
// app.use(cors({origin:"*"}));
app.use("*", cors());
// app.use(cors({origin:"http://localhost:4200/"}));
app.use('/api/feed', authFeedRouter);
 app.use('/api/user', authUserRouter);
 app.use("/Images", express.static(path.join(__dirname, "/Images")));



mongoose.connect(process.env.DB_CONNECT,{  useNewUrlParser: true}, () => console.log('connected to db')
)


app.listen(8080, () => console.log('server running!!'));
io.on('connection', (socket) => {
    console.log('a user connected');
  });
