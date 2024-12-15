package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.dto.CropDTO;
import lk.ijse.green_shadow.dto.FieldDTO;
import lk.ijse.green_shadow.dto.MonitoringLogDTO;
import lk.ijse.green_shadow.dto.StaffDTO;
import lk.ijse.green_shadow.entity.MonitoringLog;
import lk.ijse.green_shadow.service.ImageService;
import lk.ijse.green_shadow.service.impl.LogServiceImpl;
import lk.ijse.green_shadow.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@RestController
@RequestMapping("/monitoringLog")
@CrossOrigin
public class LogController {


    private final LogServiceImpl logService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ImageService imageService;

    @Autowired
    public LogController(LogServiceImpl logService) {
        this.logService = logService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseUtil> saveLog(
            @RequestParam("logCode") String logCode,
           @RequestParam("logDate") String logDate,
           @RequestParam("logDetails") String logDetails,
           @RequestParam("observedImage") MultipartFile observedImage


    ) {
        try {
            String uploadDirectory = "src/main/resources/static/images/cropLog";
            String savedImage = imageService.saveImageToStorage(uploadDirectory, observedImage, logCode);

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            // Convert string to Date
            Date date = formatter.parse(logDate);

            MonitoringLogDTO build = MonitoringLogDTO.builder().
                    logCode(logCode).
                    logDate(logDate).
                    logDetails(logDetails).
                    observedImage(savedImage)
                    .build();

            MonitoringLog savedLog = logService.saveLog(modelMapper.map(build,MonitoringLog.class));

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

    @PostMapping(path = "/list",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseUtil> saveLogList(@RequestBody MonitoringLogDTO dto) {
        try {
            MonitoringLog logById = logService.getLogById(dto.getLogCode());
            dto.setObservedImage(logById.getObservedImage());
            MonitoringLog savedLog = logService.updateLog(dto.getLogCode(),modelMapper.map(dto,MonitoringLog.class));

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
    @Secured("ADMINISTRATIVE")
    public ResponseEntity<ResponseUtil> getAllLogs() {
        try {
            List<MonitoringLog> monitoringLogs = logService.getAllLogs();

            List<MonitoringLog> newList=new ArrayList<>();
            String uploadDirectory = "src/main/resources/static/images/cropLog";
            for (MonitoringLog log:monitoringLogs){
                log.setObservedImage("data:image/jpeg;base64,"+imageService.getImageAsBase64(uploadDirectory,log.getObservedImage()));
                newList.add(log);
            }
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
