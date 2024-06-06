const mysql = require('mysql2/promise');

async function createTablesAndAddColumns() {
  const connection = await mysql.createConnection({host: 'localhost', user: 'root', database: 'your-database'});

  try {
    // Create CUSTOMERS table
    await connection.execute(`
      CREATE TABLE CUSTOMERS (
        CustomerID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Address VARCHAR(255) NOT NULL
      );
    `);

    // Create PRODUCT table
    await connection.execute(`
      CREATE TABLE PRODUCT (
        ProductID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(100) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL
      );
    `);

    // Create ORDERS table
    await connection.execute(`
      CREATE TABLE ORDERS (
        OrderID INT AUTO_INCREMENT PRIMARY KEY,
        CustomerID INT NOT NULL,
        ProductID INT NOT NULL,
        Quantity INT NOT NULL,
        FOREIGN KEY (CustomerID) REFERENCES CUSTOMERS(CustomerID),
        FOREIGN KEY (ProductID) REFERENCES PRODUCT(ProductID)
      );
    `);

    // Add Category column to PRODUCT table
    await connection.execute(`
      ALTER TABLE PRODUCT ADD COLUMN Category VARCHAR(20);
    `);

    // Add OrderDate column to ORDERS table with SYSDATE as default value
    await connection.execute(`
      ALTER TABLE ORDERS ADD COLUMN OrderDate DATE DEFAULT (CURRENT_DATE);
    `);

    console.log('Tables created and columns added successfully.');
  } catch (err) {
    console.error('Error creating tables or adding columns:', err);
  } finally {
    await connection.end();
  }
}

createTablesAndAddColumns();
