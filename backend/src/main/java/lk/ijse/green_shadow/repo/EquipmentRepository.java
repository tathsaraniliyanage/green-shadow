package lk.ijse.green_shadow.repo;

import lk.ijse.green_shadow.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment ,String> {
}
