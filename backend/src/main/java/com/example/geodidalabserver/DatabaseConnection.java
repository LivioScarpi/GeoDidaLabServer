package com.example.geodidalabserver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    public static Connection initializeDatabase(String dbURL, String dbUsername, String dbPassword)
            throws SQLException, ClassNotFoundException
    {
        // Initialize all the information regarding
        // Database Connection
        String dbDriver = "com.mysql.jdbc.Driver";
        //String dbURL = "jdbc:mysql://localhost:3306/";
        // Database name to access
        String dbName = "openalplab_backend";
        //String dbUsername = "root";
        //String dbPassword = "root";

        System.out.println("PASSWORD: " + dbPassword);
        System.out.println("USERNAME: " + dbUsername);

        //Class.forName(dbDriver);
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbURL + dbName + "?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC",
                dbUsername,
                dbPassword);

        System.out.println("Connection created");

        return con;
    }
}
