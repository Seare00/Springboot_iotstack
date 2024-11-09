package com.example.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Date;
import java.util.List;

@Controller
public class TemperatureController {

    @Autowired
    private TemperatureRepository temperatureRepository;

    @GetMapping({"/dashboard", "/search"})
    public String dashboard(Model model,
                            @RequestParam(required = false) Float minTemp,
                            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Temperature> temperatures;

        if (minTemp != null && startDate != null && endDate != null) {
            temperatures = temperatureRepository.findFiltered(minTemp, startDate, endDate);
        } else {
            temperatures = temperatureRepository.findAll();
        }

        model.addAttribute("temperatures", temperatures);
        return "dashboard";
    }

    // CORS Configuration to allow requests from the frontend
    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/latest_temperatures")
    public @ResponseBody List<Temperature> getLatestTemperatures() {
        return temperatureRepository.findAll();  // Replace with appropriate logic to get latest records
    }
}