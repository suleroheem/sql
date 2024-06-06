const { Client } = require('pg');
const client = new Client({
  connectionString: 'your-database-connection-string'
});

async function createTablesAndAddColumns() {
  await client.connect();

  try {
    // Create CUSTOMERS table
    await client.query(`
      CREATE TABLE CUSTOMERS (
        CustomerID SERIAL PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Address VARCHAR(255) NOT NULL
      );
    `);

    // Create PRODUCT table
    await client.query(`
      CREATE TABLE PRODUCT (
        ProductID SERIAL PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Price NUMERIC NOT NULL
      );
    `);

    // Create ORDERS table
    await client.query(`
      CREATE TABLE ORDERS (
        OrderID SERIAL PRIMARY KEY,
        CustomerID INT NOT NULL,
        ProductID INT NOT NULL,
        Quantity INT NOT NULL,
        FOREIGN KEY (CustomerID) REFERENCES CUSTOMERS(CustomerID),
        FOREIGN KEY (ProductID) REFERENCES PRODUCT(ProductID)
      );
    `);

    // Add Category column to PRODUCT table
    await client.query(`
      ALTER TABLE PRODUCT ADD COLUMN Category VARCHAR(20);
    `);

    // Add OrderDate column to ORDERS table with SYSDATE as default value
    await client.query(`
      ALTER TABLE ORDERS ADD COLUMN OrderDate DATE DEFAULT CURRENT_DATE;
    `);

    console.log('Tables created and columns added successfully.');
  } catch (err) {
    console.error('Error creating tables or adding columns:', err);
  } finally {
    await client.end();
  }
}

createTablesAndAddColumns();
