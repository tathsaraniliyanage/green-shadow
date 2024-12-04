package lk.ijse.green_shadow.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.green_shadow.entity.Equipment;
import lk.ijse.green_shadow.repo.EquipmentRepository;
import lk.ijse.green_shadow.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@Service
@Transactional
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public Equipment saveEquipment(Equipment equipment) {
        try {
            Equipment savedEquipment = equipmentRepository.save(equipment);
            if (equipmentRepository.existsById(savedEquipment.getEquipmentId())) {
                return savedEquipment;
            }
            throw new RuntimeException("Equipment could not be saved.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while saving the equipment: " + e.getMessage());
        }
    }

    @Override
    public Equipment updateEquipment(String equipmentId, Equipment equipment) {
        try {
            if (equipmentRepository.existsById(equipmentId)) {
                equipment.setEquipmentId(equipmentId); // Ensure the ID remains the same
                return equipmentRepository.save(equipment);
            }
            throw new RuntimeException("Equipment with ID " + equipmentId + " does not exist.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the equipment: " + e.getMessage());
        }
    }

    @Override
    public List<Equipment> getAllEquipments() {
        try {
            return equipmentRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving equipment list: " + e.getMessage());
        }
    }

    @Override
    public Equipment getEquipmentById(String equipmentId) {
        try {
            Optional<Equipment> equipment = equipmentRepository.findById(equipmentId);
            if (equipment.isPresent()) {
                return equipment.get();
            }
            throw new RuntimeException("Equipment with ID " + equipmentId + " not found.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving the equipment: " + e.getMessage());
        }
    }

    @Override
    public void deleteEquipment(String equipmentId) {
        try {
            if (equipmentRepository.existsById(equipmentId)) {
                equipmentRepository.deleteById(equipmentId);
            } else {
                throw new RuntimeException("Equipment with ID " + equipmentId + " does not exist.");
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the equipment: " + e.getMessage());
        }
    }
}
