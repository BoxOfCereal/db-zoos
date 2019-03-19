const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
const zooRoutes = require("./routes/zoos");
const bearRoutes = require("./routes/bears");
server.use("/api/zoos", zooRoutes);
server.use("/api/bears", bearRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
