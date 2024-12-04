package lk.ijse.green_shadow.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.green_shadow.entity.Vehicle;
import lk.ijse.green_shadow.repo.VehicleRepository;
import lk.ijse.green_shadow.service.VehicleService;
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
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void deleteVehicle(String vehicleCode) {
        try {
            if (vehicleRepository.existsById(vehicleCode)) {
                vehicleRepository.deleteById(vehicleCode);
            } else {
                throw new RuntimeException("Vehicle with code " + vehicleCode + " does not exist.");
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the vehicle: " + e.getMessage());
        }
    }

    @Override
    public Vehicle saveVehicle(Vehicle vehicle) {
        try {
            Vehicle savedVehicle = vehicleRepository.save(vehicle);
            if (vehicleRepository.existsById(savedVehicle.getVehicleCode())) {
                return savedVehicle;
            }
            throw new RuntimeException("Vehicle could not be saved.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while saving the vehicle: " + e.getMessage());
        }
    }

    @Override
    public Vehicle updateVehicle(String vehicleCode, Vehicle vehicle) {
        try {
            if (vehicleRepository.existsById(vehicleCode)) {
                vehicle.setVehicleCode(vehicleCode); // Ensure the ID remains unchanged
                return vehicleRepository.save(vehicle);
            }
            throw new RuntimeException("Vehicle with code " + vehicleCode + " does not exist.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the vehicle: " + e.getMessage());
        }
    }

    @Override
    public List<Vehicle> getAllVehicle() {
        try {
            return vehicleRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving the list of vehicles: " + e.getMessage());
        }
    }

    @Override
    public Vehicle getVehicle(String vehicleCode) {
        try {
            Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleCode);
            if (vehicle.isPresent()) {
                return vehicle.get();
            }
            throw new RuntimeException("Vehicle with code " + vehicleCode + " not found.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving the vehicle: " + e.getMessage());
        }
    }
}
