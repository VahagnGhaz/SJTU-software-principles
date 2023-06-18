package com.example.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;

@Configuration
public class ApplicationConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
