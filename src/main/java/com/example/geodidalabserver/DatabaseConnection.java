package com.example.geodidalabserver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    protected static Connection initializeDatabase()
            throws SQLException, ClassNotFoundException
    {
        // Initialize all the information regarding
        // Database Connection
        String dbDriver = "com.mysql.jdbc.Driver";
        String dbURL = "jdbc:mysql://localhost:3306/";
        // Database name to access
        String dbName = "geodidalab";
        String dbUsername = "root";
        String dbPassword = "root";

        Class.forName(dbDriver);
        Connection con = DriverManager.getConnection(dbURL + dbName + "?autoReconnect=true&useSSL=false",
                dbUsername,
                dbPassword);

        System.out.println("Connection: ");

        System.out.println(con);

        return con;
    }
}
