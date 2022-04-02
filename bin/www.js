import app from "../app.js";
import https from "https";
import { readFileSync } from "fs";

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || "5000");

app.set("port", port);
const httpsOptions = {
  key: readFileSync("./security/cert.key"),
  cert: readFileSync("./security/cert.pem"),
};

const server = https.createServer(httpsOptions, app);

server.listen(port);

const onError = (error) => {
  if (error.syscall !== "listen") throw error;

  console.error("ERROR");

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

server.on("error", onError);
server.on("listening", () => {
  console.info("Listening on " + port);
});
