package lk.ijse.green_shadow.service;

import lk.ijse.green_shadow.entity.MonitoringLog;

import java.util.List;

public interface LogService {
    MonitoringLog saveLog(MonitoringLog monitoringLog);

    MonitoringLog updateLog(String logCode, MonitoringLog monitoringLog);

    List<MonitoringLog> getAllLogs();

    MonitoringLog getLogById(String logCode);

    void deleteLog(String logCode);
}
