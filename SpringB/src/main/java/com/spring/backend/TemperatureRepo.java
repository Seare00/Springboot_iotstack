package com.spring.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TemperatureRepo extends JpaRepository<Temperature, Long>{
}
