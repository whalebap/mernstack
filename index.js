const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-form-urlencoded 을 분석함
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 을 분석함
app.use(bodyParser.json());

const mongoose = require("mongoose");
const { json } = require("express/lib/response");
mongoose
  .connect(
    config.mongoURI
    // {
    //   useNewUrlParser: true,
    //   //   useUnifiedTopology: true,
    //   //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져옴
  // 그것들을 DB에 넣어줌

  // req.body 안에 bodyParser가 추출한 정보가 들어감
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err: err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.listen(port, () => console.log(`localhost:${port} `));
