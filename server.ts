import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(express.json());

// Database Connection
const db = new sqlite3.Database("employees.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }
});

// Create Table
db.run(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary REAL NOT NULL
)
`);

// Home Route
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Employee CRUD API Running"
    });
});

// CREATE Employee
app.post("/employees", (req: Request, res: Response) => {
    const { name, department, salary } = req.body;

    db.run(
        `INSERT INTO employees (name, department, salary)
         VALUES (?, ?, ?)`,
        [name, department, salary],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Employee Added Successfully",
                employeeId: this.lastID
            });
        }
    );
});

// READ All Employees
app.get("/employees", (req: Request, res: Response) => {

    db.all(
        "SELECT * FROM employees",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(200).json(rows);
        }
    );
});

// READ Single Employee
app.get("/employees/:id", (req: Request, res: Response) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM employees WHERE id=?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Employee Not Found"
                });
            }

            res.status(200).json(row);
        }
    );
});

// UPDATE Employee
app.put("/employees/:id", (req: Request, res: Response) => {

    const id = req.params.id;
    const { salary } = req.body;

    db.run(
        "UPDATE employees SET salary=? WHERE id=?",
        [salary, id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Employee Not Found"
                });
            }

            res.json({
                message: "Employee Updated Successfully"
            });
        }
    );
});

// DELETE Employee
app.delete("/employees/:id", (req: Request, res: Response) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM employees WHERE id=?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Employee Not Found"
                });
            }

            res.json({
                message: "Employee Deleted Successfully"
            });
        }
    );
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});