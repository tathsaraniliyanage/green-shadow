package lk.ijse.green_shadow.service;

import lk.ijse.green_shadow.entity.Crop;
import lk.ijse.green_shadow.entity.Field;

import java.util.List;

public interface CropService {
    Crop saveCrop(Crop crop);

    Crop updateCrop(String cropCode, Crop crop);

    List<Crop> getAllCrops();

    public Crop getCrop(String cropCode);

    void deleteCrop(String cropCode);
}
