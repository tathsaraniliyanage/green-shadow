package lk.ijse.green_shadow.service;

import lk.ijse.green_shadow.entity.Vehicle;

import java.util.List;

public interface VehicleService {
    void deleteVehicle(String vehicleCode);

    Vehicle saveVehicle(Vehicle vehicle);

    Vehicle updateVehicle(String vehicleCode, Vehicle vehicle);

    List<Vehicle> getAllVehicle();

    Vehicle getVehicle(String vehicleCode);
}
