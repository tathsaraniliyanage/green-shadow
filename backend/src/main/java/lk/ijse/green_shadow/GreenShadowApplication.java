package lk.ijse.green_shadow;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * @author Prabodha Thathsarani
 * @date 11/14/24
 * @project green_shadow
 **/

@SpringBootApplication
public class GreenShadowApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenShadowApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }




}
