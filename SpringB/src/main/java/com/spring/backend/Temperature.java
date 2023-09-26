package com.spring.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "temperature")
public class Temperature {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private Long id;
	@Getter@Setter
	private double temp;
	
	public Temperature() {
		
	}
	
	public Temperature(double temp) {
		this.temp = temp;
	}
	
	public double getTemp() {
		return temp;
	}
	
}
