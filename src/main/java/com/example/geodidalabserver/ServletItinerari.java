package com.example.geodidalabserver;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Random;

public class ServletItinerari extends HttpServlet {

    public ServletItinerari() {
    }

    public void init() {
    }

    public void destroy() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        // Hello
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1> Geodidalab Servlet </h1>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        super.doPost(req, resp);

        System.out.println("SONO IN doPost - servletItinerari");

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
        }
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


            resp.setContentType("application/json");
// Get the printwriter object from response to write the required json object to the output stream

            System.out.println("5");

            PrintWriter out = resp.getWriter();

            System.out.println("6");

// Assuming your json object is **jsonObject**, perform the following, it will return your json object
            out.print(randomId);

            System.out.println("7");

            out.flush();

            System.out.println("8");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void ottieniItinerario(HttpServletRequest req, HttpServletResponse resp) {
        try {
            // Initialize the database
            Connection con = DatabaseConnection.initializeDatabase();

            String idItinerario = req.getParameter("idItinerario");

            System.out.println("idItinerario: " + idItinerario);

            //controllo se l'ID Esiste già nel DB
            PreparedStatement ps = con
                    .prepareStatement("select * from Itinerario where ID = ?");

            ps.setString(1, idItinerario);

            System.out.println("1");

            ResultSet results = ps.executeQuery();

            System.out.println("2");

            String id = null;
            String jsonItinerario = null;

            while (results.next()) { //esiste sempre e solo un record con quell'id -> id è primary key
                // Get the data from the current row using the column index - column data are in the VARCHAR format

                String data = results.getString(1);
                id = data;
                System.out.println("Fetching data by column index for row " + results.getRow() + " : " + data);

                // Get the data from the current row using the column name - column data are in the VARCHAR format

                data = results.getString("JSON_Itinerario");
                jsonItinerario = data;
                System.out.println("Fetching data by column name for row " + results.getRow() + " : " + data);
            }

            System.out.println("3");

            // Close all the connections
            ps.close();
            con.close();
            System.out.println("4");

            resp.setContentType("application/json");
// Get the printwriter object from response to write the required json object to the output stream

            System.out.println("5");

            PrintWriter out = resp.getWriter();

            System.out.println("6");

// Assuming your json object is **jsonObject**, perform the following, it will return your json object
            out.print(jsonItinerario);

            System.out.println("7");

            out.flush();

            System.out.println("8");


        } catch (Exception e) {
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