package lk.ijse.green_shadow.controller;

import lk.ijse.green_shadow.entity.Field;
import lk.ijse.green_shadow.service.FieldService;
import lk.ijse.green_shadow.service.ImageService;
import lk.ijse.green_shadow.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * @author
 * @date 11/14/24
 * @project green_shadow
 **/

@RestController
@RequestMapping("/fields")
@CrossOrigin
public class FieldController {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private FieldService fieldService;
    @Autowired
    private ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseUtil> saveField(
            @RequestParam("fieldCode") String fieldCode,
            @RequestParam("fieldName") String fieldName,
            @RequestParam("fieldLocation") String fieldLocation,
            @RequestParam("extentSize") Double extentSize,
            @RequestParam("fieldImage1") MultipartFile fieldImage1,
            @RequestParam("fieldImage2") MultipartFile fieldImage2
    ) {
        try {

            String uploadDirectory = "src/main/resources/static/images/field";
            String imag1 = imageService.saveImageToStorage(uploadDirectory, fieldImage1, fieldCode + "_1");
            String imag2 = imageService.saveImageToStorage(uploadDirectory, fieldImage2, fieldCode + "_2");

            Field build = Field.builder().
                    fieldCode(fieldCode).
                    fieldName(fieldName).
                    fieldLocation(fieldLocation).
                    extentSize(extentSize).
                    fieldImage1(imag1).
                    fieldImage2(imag2)
                    .build();


            Field savedField = fieldService.saveField(build);
            return ResponseEntity.status(201).body(
                    ResponseUtil.builder()
                            .code(201)
                            .data(savedField)
                            .message("Field saved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to save field: " + e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseUtil> updateField(
            @RequestParam("fieldCode") String fieldCode,
            @RequestParam("fieldName") String fieldName,
            @RequestParam("fieldLocation") String fieldLocation,
            @RequestParam("extentSize") Double extentSize,
            @RequestParam("fieldImage1") MultipartFile fieldImage1,
            @RequestParam("fieldImage2") MultipartFile fieldImage2
    ) {
        try {
            String uploadDirectory = "src/main/resources/static/images/field";
            Field field = fieldService.getFieldById(fieldCode).get();
            String imag1;
            String imag2;
            if (fieldImage1.isEmpty()){
                imag1=field.getFieldImage1();
            }else {
                imag1 = imageService.saveImageToStorage(uploadDirectory, fieldImage1, fieldCode + "_1");
            }
            if (fieldImage2.isEmpty()){
                imag2=field.getFieldImage2();
            }else {
                imag2 = imageService.saveImageToStorage(uploadDirectory, fieldImage2, fieldCode + "_2");
            }

            Field build = Field.builder().
                    fieldCode(fieldCode).
                    fieldName(fieldName).
                    fieldLocation(fieldLocation).
                    extentSize(extentSize).
                    fieldImage1(imag1).
                    fieldImage2(imag2)
                    .build();

            Field updatedField = fieldService.updateField(fieldCode, build);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(updatedField)
                            .message("Field updated successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to update field: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseUtil> getAllFields() {
        try {
            String uploadDirectory = "src/main/resources/static/images/field";
            List<Field> fields = fieldService.getAllFields();
            List<Field> newList = new ArrayList<>();
            for (Field field : fields) {
                field.setFieldImage1("data:image/jpeg;base64,"+imageService.getImageAsBase64(uploadDirectory, field.getFieldImage1()));
                field.setFieldImage2("data:image/jpeg;base64,"+imageService.getImageAsBase64(uploadDirectory, field.getFieldImage2()));
                newList.add(field);
            }
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .data(newList)
                            .message("Fields retrieved successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve fields: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/{fieldCode}")
    public ResponseEntity<ResponseUtil> getFieldById(@PathVariable String fieldCode) {
        try {
            try {
                Field field = fieldService.getFieldById(fieldCode).get();
                String uploadDirectory = "src/main/resources/static/images/field";
                field.setFieldImage1("data:image/jpeg;base64,"+imageService.getImageAsBase64(uploadDirectory, field.getFieldImage1()));
                field.setFieldImage2("data:image/jpeg;base64,"+imageService.getImageAsBase64(uploadDirectory, field.getFieldImage2()));

                return ResponseEntity.ok(ResponseUtil.builder()
                        .code(200)
                        .data(field)
                        .message("Field retrieved successfully.")
                        .build());
            } catch (Exception e) {
                return ResponseEntity.status(404).body(
                        ResponseUtil.builder()
                                .code(404)
                                .message("Field not found.")
                                .build()
                );
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to retrieve field: " + e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{fieldCode}")
    public ResponseEntity<ResponseUtil> deleteField(@PathVariable String fieldCode) {
        try {
            fieldService.deleteField(fieldCode);
            return ResponseEntity.ok(
                    ResponseUtil.builder()
                            .code(200)
                            .message("Field deleted successfully.")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    ResponseUtil.builder()
                            .code(500)
                            .message("Failed to delete field: " + e.getMessage())
                            .build()
            );
        }
    }
}
