package com.example.geodidalabserver.controller;

import com.google.gson.Gson;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ResponseController {
    private static ResponseController instance = null;
    private final Gson gson;

    private ResponseController(){
        this.gson = new Gson();
    }

    public static ResponseController getInstance(){
        if (instance == null){
            instance = new ResponseController();
        }
        return instance;
    }

    public  void ok(HttpServletResponse response,Object object){
        ok(response,object,"application/json");
    }

    public void ok(HttpServletResponse response, Object object, String contentType){
        PrintWriter out = null;
        try {
            response.setContentType(contentType);
            response.setCharacterEncoding("UTF8");
            out = response.getWriter();
            String valJson = gson.toJson(object);
            out.print(valJson);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void badRequest(HttpServletResponse response,String message) {
        try {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST,message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void notFound(HttpServletResponse response,String message){
        try {
            response.sendError(HttpServletResponse.SC_NOT_FOUND,message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
