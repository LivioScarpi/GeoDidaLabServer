package com.example.geodidalabserver.controller;


import com.example.geodidalabserver.DatabaseConnection;
import com.example.geodidalabserver.controller.ResponseController;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Random;

@WebServlet(name = "pippo", value = {"/api/itinerari/*", "/api/itinerari"})
public class ServletItinerari extends HttpServlet {

    ResponseController responseController;

    @Override
    public void init() {
        responseController = ResponseController.getInstance();
    }

    public void destroy() {
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("SONO IN doGet - servletItinerari");

        String methodInfo = req.getPathInfo();

        if(methodInfo == null || methodInfo.length() == 0){
            methodInfo = "/";
        }

        switch (methodInfo){
            case "/":
                responseController.badRequest(resp, methodInfo);
                break;
            default:
                ottieniItinerario(req, resp);
                break;
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        System.out.println("SONO IN doPost - servletItinerari");

        String methodInfo = req.getPathInfo();

        if(methodInfo == null || methodInfo.length() == 0){
            methodInfo = "/";
        }

        switch (methodInfo){
            case "/":
                inserisciItinerario(req, resp);
                break;
            default:
                responseController.badRequest(resp, methodInfo);
                break;
        }

        /*
        String action = req.getParameter("action");

        System.out.println("Action: " + action);

        switch (action) {
            case "inserisciItinerario":
                inserisciItinerario(req, resp);
                break;
            case "ottieniItinerario":
                ottieniItinerario(req, resp);
                break;
            default:
                break;
        }*/
    }

    private void inserisciItinerario(HttpServletRequest req, HttpServletResponse resp) {
        try {
            // Initialize the database
            Connection con = DatabaseConnection.initializeDatabase();

            java.util.Date date = new java.util.Date();
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            java.sql.Timestamp sqlTime = new java.sql.Timestamp(date.getTime());

            PreparedStatement ps = con
                    .prepareStatement("insert into Itinerario values(?, ?, ?, ?)");

            String randomId = generateRandomSAlphanumericString();

            boolean idAlreadyExists = true;

            while (idAlreadyExists) {
                //controllo se l'ID Esiste già nel DB
                PreparedStatement checkPS = con
                        .prepareStatement("select * from Itinerario where ID = ?");

                checkPS.setString(1, randomId);

                ResultSet checkResults = checkPS.executeQuery();

                // checking if ResultSet is empty
                if (!checkResults.next()) {
                    System.out.println("ResultSet empty in Java");

                    //se non esiste l'id metto a false il flag
                    idAlreadyExists = false;
                } else {
                    System.out.println("ResultSet not empty in Java");
                }
            }

            ps.setString(1, randomId);
            ps.setDate(2, sqlDate);
            ps.setTimestamp(3, sqlTime);

            String payloadRequest = getBody(req);

            System.out.println("payloadRequest");
            System.out.println(payloadRequest);

            // Same for second parameter
            ps.setString(4, payloadRequest);

            // Execute the insert command using executeUpdate() to make changes in database
            ps.executeUpdate();

            // Close all the connections
            ps.close();
            con.close();

            responseController.ok(resp, randomId);

        } catch (Exception e) {
            responseController.badRequest(resp, e.getMessage());
            e.printStackTrace();
        }
    }

    private void ottieniItinerario(HttpServletRequest req, HttpServletResponse resp) {
        try {
            // Initialize the database
            Connection con = DatabaseConnection.initializeDatabase();

            String idItinerario = req.getPathInfo().replace("/", "");

            System.out.println("idItinerario: " + idItinerario);

            //controllo se l'ID Esiste già nel DB
            PreparedStatement ps = con
                    .prepareStatement("select * from Itinerario where ID = ?");

            ps.setString(1, idItinerario);

            ResultSet results = ps.executeQuery();

            String id = null;
            JsonObject jsonItinerario = null;

            while (results.next()) { //esiste sempre e solo un record con quell'id -> id è primary key
                // Get the data from the current row using the column index - column data are in the VARCHAR format

                String data = results.getString(1);
                id = data;
                System.out.println("Fetching data by column index for row " + results.getRow() + " : " + data);

                // Get the data from the current row using the column name - column data are in the VARCHAR format

                data = results.getString("JSON_Itinerario");
                jsonItinerario = new Gson().fromJson(data, JsonObject.class);
                System.out.println("Fetching data by column name for row " + results.getRow() + " : " + data);
            }



            // Close all the connections
            ps.close();
            con.close();

            responseController.ok(resp, jsonItinerario);

        } catch (Exception e) {
            responseController.badRequest(resp, e.getMessage());
            e.printStackTrace();
        }
    }

    public static String getBody(HttpServletRequest request) throws IOException {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }

    private String generateRandomSAlphanumericString() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 20;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        System.out.println(generatedString);

        return generatedString;
    }
}