package com.spring.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class TempController {

	private final TemperatureRepo repo;
	
	@Autowired
	public TempController(TemperatureRepo repo) {
		this.repo = repo;
	}

	@GetMapping("/uppsala")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Temperature> getTemp() {
		return repo.findAll();
	}
}
