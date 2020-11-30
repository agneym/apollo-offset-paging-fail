const { Client } = require("pg");
const sql = require('sql');
const generatePeople = require("./generatePeople");

const Person = sql.define({
  name: 'person',
  columns: [
    'first_name',
    'last_name',
    'job_title'
  ]
});

async function setup() {
  let client;
  try {
    client = new Client({
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://agney@localhost:5432/pagination-test",
    });
    await client.connect();
  
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.person(
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        job_title TEXT
      )
    `);

    await client.query(`DELETE FROM public.person`);
  
    const people = generatePeople(40);
  
    const rows = await client.query(Person.insert(people).toQuery());
    console.log(rows);
  } catch(err) {
    console.error(err);
  } finally {
    client.end();
  }
}

setup();
