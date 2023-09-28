package com.spring.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class TempController {

	private final TemperatureRepo repo;
	private final SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	public TempController(TemperatureRepo repo, SimpMessagingTemplate messagingTemplate) {
		this.repo = repo;
		this.messagingTemplate = messagingTemplate;
	}

	@GetMapping("/uppsala")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Temperature> getUppsala() {
		return repo.findAllByPlatsUppsala();
	}
	
	@GetMapping("/stockholm-e")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Temperature> getStockholmE() {
		return repo.findAllByPlatsStockholmE();
	}
	
	@GetMapping("/stockholm-w")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Temperature> getStockholmW() {
		return repo.findAllByPlatsStockholmW();
	}
	
	/* Handling POST requests to database and publishing to websocket */
	@PostMapping("/insert")
	public void insertTemp(@RequestBody Temperature temperature) {
		repo.save(temperature);
		if(temperature.getPlats().equals("Uppsala")) {
			messagingTemplate.convertAndSend("/topic/temperature/uppsala", temperature);			
		}else if (temperature.getPlats().equals("Stockholm E")) {
			messagingTemplate.convertAndSend("/topic/temperature/stockholm-e", temperature);
		}else if (temperature.getPlats().equals("Stockholm W")) {
			messagingTemplate.convertAndSend("/topic/temperature/stockholm-w", temperature);
		}
	}
	
}
