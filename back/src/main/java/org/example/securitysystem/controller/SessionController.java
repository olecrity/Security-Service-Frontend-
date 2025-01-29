package org.example.securitysystem.controller;

import com.google.gson.Gson;
import org.example.securitysystem.model.dto.*;
import org.example.securitysystem.model.entity.Session;
import org.example.securitysystem.service.application_service.implementations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    private final SessionService sessionService;
    private final LogService logService;
    private final Gson gson;

    @Autowired
    public SessionController(SessionService sessionService, LogService logService) {
        this.sessionService = sessionService;
        this.logService = logService;
        this.gson = new Gson();
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the Security System!";
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody SessionRequest request) {
        try {
            Session session = sessionService.createSession(request.getName());
            return ResponseEntity.ok(gson.toJson(session));
        } catch (Exception e) {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(gson.toJson(messageResponse));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody SessionRequest request) {
        try {
            Session session = sessionService.openSession(request.getName());
            return ResponseEntity.ok(gson.toJson(session));
        } catch (Exception e) {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(gson.toJson(messageResponse));
        }
    }

    @GetMapping("/accounts")
    public ResponseEntity<String> getAllSessions() {
        try {
            List<Session> sessions = sessionService.getAllSessions();
            return ResponseEntity.ok(gson.toJson(sessions));
        } catch (Exception e) {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(gson.toJson(messageResponse));
        }
    }

    @GetMapping("/get-logs")
    public ResponseEntity<String> getLogs(
            @RequestParam(required = false) Long sessionId,
            @RequestParam(required = false) Long floorId,
            @RequestParam(required = false) Long roomId,
            @RequestParam(required = false) String sensorType) {
        try {
            List<SensorLog> logs = logService.getEventLogs(
                    sessionId,
                    floorId,
                    roomId,
                    sensorType
            );

            return ResponseEntity.ok(gson.toJson(logs));
        }
        catch (Exception e) {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(gson.toJson(messageResponse));
        }
    }
}