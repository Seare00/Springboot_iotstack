package com.example.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface TemperatureRepository extends JpaRepository<Temperature, Long> {
    @Query("SELECT t FROM Temperature t WHERE t.temp >= ?1 AND t.date >= ?2 AND t.date <= ?3")
    List<Temperature> findFiltered(Float minTemp, Date startDate, Date endDate);
}

