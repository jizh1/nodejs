const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// 设置用于身份验证的本地策略
passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "admin" && password === "password") {
      return done(null, { username: "admin" });
    } else {
      return done(null, false);
    }
  })
);

// 序列化和反序列化用户对象
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, { username: username });
});

// 配置 Express 应用程序使用 Passport 和会话
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 创建路由处理程序
app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
