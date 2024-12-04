package lk.ijse.green_shadow.service;

import lk.ijse.green_shadow.entity.Field;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FieldService {

    Field saveField(Field field);

    Field updateField(String fieldCode, Field updatedField);

    List<Field> getAllFields();

    Optional<Field> getFieldById(String fieldCode);

    void deleteField(String fieldCode);
}
