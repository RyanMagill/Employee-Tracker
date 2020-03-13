// Dependencies
//var express = require("express");
var mysql = require("mysql");

const inquirer = require("inquirer");


// Sets up the Express App
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "dennis97",
    database: "employees_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runApp();
  });

function runApp(){

    inquirer.prompt([

        {
            type:"list",
            name: "WTD",
            message: "What would you like to do?",
            choices:[
                "Add departments, roles, or employees",
                "View departments, roles, or employees",
                "Update employee roles"
            ]
        },
    ]).then((answer)=>{
        if(answer.WTD === "Add departments, roles, or employees"){
            addDRE();
        }
        if(answer.WTD === "View departments, roles, or employees"){
            viewDRE();
        }
        if(answer.WTD === "Update employee roles"){
            updateRoles();
        }
    })
}

function addDRE(){
    inquirer.prompt([

        {
            type:"list",
            name: "addDRE",
            message: "Choose one",
            choices:[
                "Add department",
                "Add role",
                "Add employee",
                "go back"
            ]
        },
    ]).then((answer)=>{
        if(answer.addDRE === "Add department"){
            inquirer.prompt([
                {
                    type:"input",
                    name:"dName",
                    message: "What is the name of the department?"
                }
            ]).then((answer)=>{
                var query = connection.query(
                    "INSERT INTO departments SET ?",
                    {
                        name: answer.dName
                    },
                    function(err, res) {
                        if (err) throw err;
                        
                    }
                )
                runApp();
            })
        }

        if(answer.addDRE === "Add role"){
            inquirer.prompt([
                {
                    type:"input",
                    name:"rTitle",
                    message: "What is the title of the role?"
                },
                {
                    type:"input",
                    name:"rSalary",
                    message: "What is the salary of the role?"
                },
                {
                    type:"input",
                    name:"rDepID",
                    message: "What is the department # of the role?"
                }
            ]).then((answer)=>{
                var query = connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: answer.rTitle,
                        salary: answer.rSalary,
                        department_id: answer.rDepID
                    },
                    function(err, res) {
                        if (err) throw err;
                        
                    }
                )
                runApp();
            })
            
        }
        if(answer.addDRE === "Add employee"){
            inquirer.prompt([
                {
                    type:"input",
                    name:"eFName",
                    message: "What is the first name of your employee?"
                },
                {
                    type:"input",
                    name:"eLName",
                    message: "What is the last name of your employee?"
                },
                {
                    type:"input",
                    name:"roleID",
                    message: "What is your employees role?"
                },
                {
                    type:"input",
                    name:"eManagerID",
                    message: "What is your employees managers id?"
                }
            ]).then((answer)=>{
                var query = connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: answer.eFName,
                        last_name: answer.eLName,
                        role_id: answer.roleID,
                        manager_id: answer.eManagerID
                    },
                    function(err, res) {
                        if (err) throw err;
                        
                    }
                )
                runApp();
            })
        }
        if(answer.addDRE === "go back"){
            runApp();
        }
    })
}

function viewDRE(){
    inquirer.prompt([

        {
            type:"list",
            name: "viewDRE",
            message: "Choose one",
            choices:[
                "View departments",
                "View roles",
                "View employees",
                "go back"
            ]
        },
    ]).then((answer)=>{
        if(answer.viewDRE === "View departments"){
            connection.query("SELECT * FROM departments", function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
                connection.end();
            })
            runApp();
        }   
        if(answer.viewDRE === "View roles"){
            connection.query("SELECT * FROM roles", function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
                connection.end();
            })
            runApp();
        } 
        if(answer.viewDRE === "View employees"){
            connection.query("SELECT * FROM employees", function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
                connection.end();
            })
            runApp();
        } 
        if(answer.viewDRE === "go back"){
            runApp();
        }
    })    
}

function updateRoles(){
    inquirer.prompt([
        {
            type:"input",
            name: "empID",
            message: "Which employee would you like to update?(Enter ID #)"
        }
        
    ]).then((answer)=>{
        connection.query( 
            "SELECT employees.role_id, roles.id, roles.title FROM employees INNER JOIN roles ON employees.role_id=roles.id", (err,res)=>{
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
                connection.end();
            }
            
        )


    })
}

