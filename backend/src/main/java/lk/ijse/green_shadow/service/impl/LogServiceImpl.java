package lk.ijse.green_shadow.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.green_shadow.entity.MonitoringLog;
import lk.ijse.green_shadow.repo.MonitoringLogRepository;
import lk.ijse.green_shadow.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author
 * @date 11/14/24
 * @project green_shadow
 **/

@Service
@Transactional
public class LogServiceImpl implements LogService {

    @Autowired
    private MonitoringLogRepository logRepository;

    @Override
    public MonitoringLog saveLog(MonitoringLog monitoringLog) {
        try {
            MonitoringLog savedLog = logRepository.save(monitoringLog);
            if (logRepository.existsById(savedLog.getLogCode())) {
                return savedLog;
            }
            throw new RuntimeException("Log could not be saved.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while saving the log: " + e.getMessage());
        }
    }

    @Override
    public MonitoringLog updateLog(String logCode, MonitoringLog monitoringLog) {
        try {
            if (logRepository.existsById(logCode)) {
                monitoringLog.setLogCode(logCode); // Ensure the log code remains unchanged
                return logRepository.save(monitoringLog);
            }
            throw new RuntimeException("Log with code " + logCode + " does not exist.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the log: " + e.getMessage());
        }
    }

    @Override
    public List<MonitoringLog> getAllLogs() {
        try {
            return logRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving logs: " + e.getMessage());
        }
    }

    @Override
    public MonitoringLog getLogById(String logCode) {
        try {
            Optional<MonitoringLog> log = logRepository.findById(logCode);
            if (log.isPresent()) {
                return log.get();
            }
            throw new RuntimeException("Log with code " + logCode + " not found.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving the log: " + e.getMessage());
        }
    }

    @Override
    public void deleteLog(String logCode) {
        try {
            if (logRepository.existsById(logCode)) {
                logRepository.deleteById(logCode);
            } else {
                throw new RuntimeException("Log with code " + logCode + " does not exist.");
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the log: " + e.getMessage());
        }
    }
}
