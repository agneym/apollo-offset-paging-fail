const express = require("express");
var cors = require('cors');
const { postgraphile } = require("postgraphile");

const app = express();

app.use(cors());

app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://agney@localhost:5432/pagination-test",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(process.env.PORT || 4000);