package lk.ijse.green_shadow.service;


import lk.ijse.green_shadow.entity.Equipment;
import java.util.List;

public interface EquipmentService {


    Equipment saveEquipment(Equipment equipment);

    Equipment updateEquipment(String equipmentId, Equipment equipment);

    List<Equipment> getAllEquipments();

    Equipment getEquipmentById(String equipmentId);

    void deleteEquipment(String equipmentId);
}
