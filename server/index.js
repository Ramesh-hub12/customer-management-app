const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')
const { Console } = require('console')

const app = express();
app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'database.db')
let db = null


const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(5000, () => {
      console.log('Server Running at http://localhost:5000/')
    })
  } catch (e) {
    console.log(`Database error is ${e.message}`);
    process.exit(1)
  }
}
initializeDBAndServer()

const customersKeyChange = (obj) => {
  return {
    Id: obj.id,
    firstName: obj.first_name,
    lastName: obj.last_name,
    phoneNumber:obj.phone_number,   
  };
};

app.post("/api/customers", async (req, res) => {
  let { firstName, lastName, phoneNumber } = req.body;
  let addCustomers = `INSERT INTO customers (first_name,last_name, phone_number) VALUES('${firstName}','${lastName}','${phoneNumber}');`;
  let dbResponse = await db.run(addCustomers);
  res.send(`customer Successfully Added`);

});

// app.get('/api/customers/', async (request, response) => {
//   const getAllCustomers = `SELECT  * FROM customers;`
//   const responseQuery = await db.all(getAllCustomers)
//   response.send(responseQuery.map((each) => customersKeyChange(each)))
// }) 

app.get("/api/customers/", async (request, response) => {
  const {
    offset = 2,
    limit = 5,
    order = "ASC",
    order_by = "id",
    search_q = "",
  } = request.query;
  const getCustomersQuery = `SELECT * FROM customers WHERE first_ame LIKE '%${search_q}%' ORDER BY ${order_by} ${order} LIMIT ${limit} OFFSET ${offset};`;
  const customersArray = await db.all(getCustomersQuery);
  response.send(customersArray);
});

app.get('/api/customers/:Id', async (request, response) => {
  const {Id} = request.params
  const getCustomerQuery = `SELECT * FROM customers WHERE id = ${Id};`
  const responseQuery = await db.get(getCustomerQuery)
  response.send(responseQuery)
})

app.put("/api/customers/:Id", async (req, res) => { 
  let { Id } = req.params;
  let { firstName, lastName, phoneNumber, } = req.body;
  let updateCustomerQuery = `UPDATE customers SET first_name = '${firstName}',last_name = '${lastName}',phone_number = '${phoneNumber}' WHERE id = ${Id}`;
  let dbResponse = await db.run(updateCustomerQuery);
  res.send(`customer Details Updated`);
});

app.delete("/api/customers/:id/",  async (req, res) => {
  let { Id } = req.params;
  let DeleteCustomer = `DELETE FROM customers  WHERE id = '${Id}'`;
  let dbResponse = await db.run(DeleteCustomer);
  res.send(`customer Removed`);
});


// Address Table //
// POST // 

app.post("/api/customers/:id/addresses", async (req, res) => {
  try {
    const { id } = req.params; // customer id from params
    const { address_details, city, state, pin_code } = req.body;

    // Use parameterized query to prevent SQL injection
    const addingNewAddress = `
      INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
      VALUES (?, ?, ?, ?, ?);
    `;

    const dbResponse = await db.run(addingNewAddress, [id, address_details, city, state, pin_code]);

    res.status(201).send({
      message: "Address added successfully",
      addressId: dbResponse.lastID
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add address" });
  }
});

// GET //

// GET all addresses for a customer
app.get("/api/customers/:id/addresses", async (req, res) => {
    const customerId = req.params.id;
    const sql = `SELECT * FROM addresses WHERE customer_id = ${customerId}`;
    const dbResponse = await db.all(sql);
    res.send(dbResponse);
});

//PUT: Update an Address
app.put('/api/customers/:id/addresses/:addressId', async (req, res) => {
    const { id: customerId, addressId } = req.params; // customerId and addressId from params
    const { address_details, city, state, pin_code } = req.body; // updated data

    try {
        const sql = `
            UPDATE addresses 
            SET address_details = ?, city = ?, state = ?, pin_code = ? 
            WHERE id = ? AND customer_id = ?
        `;

        const dbResponse = await db.run(sql, [address_details, city, state, pin_code, addressId, customerId]);

        if (dbResponse.changes === 0) {
            return res.status(404).send({ error: "Address not found or no changes made" });
        }

        res.status(200).send({ message: "Address updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update address" });
    }
});


// DELETE // 
app.delete("/api/addresses/:addressId",  async (req, res) => {
  const { addressId } = req.params;

  const sql = `DELETE FROM addresses WHERE id = ${addressId}`;
  await db.run(sql);
  res.send("Address Deleted Successfully");

  
});