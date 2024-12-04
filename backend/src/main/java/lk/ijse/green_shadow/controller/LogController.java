package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.entity.MonitoringLog;
import lk.ijse.green_shadow.service.impl.LogServiceImpl;
import lk.ijse.green_shadow.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@RestController
@RequestMapping("/monitoringLog")
public class LogController {

    private final LogServiceImpl logService;

    @Autowired
    public LogController(LogServiceImpl logService) {
        this.logService = logService;
    }

    @PostMapping
    public ResponseEntity<ResponseUtil> saveLog(@RequestBody MonitoringLog monitoringLog) {
        try {
            MonitoringLog savedLog = logService.saveLog(monitoringLog);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedLog)
                            .message("Monitoring log saved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to save monitoring log: " + e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/{logCode}")
    public ResponseEntity<ResponseUtil> updateLog(@PathVariable String logCode, @RequestBody MonitoringLog monitoringLog) {
        try {
            MonitoringLog updatedLog = logService.updateLog(logCode, monitoringLog);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedLog)
                            .message("Monitoring log updated successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to update monitoring log: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllLogs() {
        try {
            List<MonitoringLog> monitoringLogs = logService.getAllLogs();
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(monitoringLogs)
                            .message("Monitoring logs retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve monitoring logs: " + e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{logCode}")
    public ResponseEntity<ResponseUtil> deleteLog(@PathVariable String logCode) {
        try {
            logService.deleteLog(logCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Monitoring log deleted successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to delete monitoring log: " + e.getMessage())
                            .build()
            );
        }
    }
}
