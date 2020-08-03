package com.gsdev.desafiodigivox.controllers;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gsdev.desafiodigivox.models.Customer;
import com.gsdev.desafiodigivox.models.Item;
import com.gsdev.desafiodigivox.models.Location;
import com.gsdev.desafiodigivox.repository.CustomerRepository;
import com.gsdev.desafiodigivox.repository.ItemRepository;
import com.gsdev.desafiodigivox.repository.LocationRepository;

@RestController
@RequestMapping(value = "/api")
public class LocationController {
	@Autowired
	LocationRepository locationRepository;
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	CustomerRepository customerRepository;
	
	@GetMapping("/location")
	public List<Location> index(){
		return locationRepository.findAllByOrderByReturnDateAsc();
	}
	
	@GetMapping("/location-week-initial")
	public List<Location> indexWeekInitial(){
		Calendar sunday = Calendar.getInstance();
		sunday.set(Calendar.DAY_OF_WEEK,Calendar.SUNDAY);
		sunday.set(Calendar.HOUR_OF_DAY,0);
		sunday.set(Calendar.MINUTE,0);
		sunday.set(Calendar.SECOND,0);
		
		Calendar nextsunday = Calendar.getInstance();
		nextsunday.set(Calendar.DAY_OF_WEEK,Calendar.SUNDAY);
		nextsunday.set(Calendar.HOUR_OF_DAY,0);
		nextsunday.set(Calendar.MINUTE,0);
		nextsunday.set(Calendar.SECOND,0);
		nextsunday.add(Calendar.DATE,7);
		
		return locationRepository.findWeekInitial(sunday.getTime(), nextsunday.getTime());
	}
	
	@GetMapping("/location-week-return")
	public List<Location> indexWeekReturn(){
		Calendar sunday = Calendar.getInstance();
		sunday.set(Calendar.DAY_OF_WEEK,Calendar.SUNDAY);
		sunday.set(Calendar.HOUR_OF_DAY,0);
		sunday.set(Calendar.MINUTE,0);
		sunday.set(Calendar.SECOND,0);
		
		Calendar nextsunday = Calendar.getInstance();
		nextsunday.set(Calendar.DAY_OF_WEEK,Calendar.SUNDAY);
		nextsunday.set(Calendar.HOUR_OF_DAY,0);
		nextsunday.set(Calendar.MINUTE,0);
		nextsunday.set(Calendar.SECOND,0);
		nextsunday.add(Calendar.DATE,7);
		
		
		return locationRepository.findWeekReturn(sunday.getTime(), nextsunday.getTime());
	}
	
	@GetMapping("/location/{id}")
	public ResponseEntity<?> indexId(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		if(!locationRepository.existsById(id)) {
			String errorString = "{\"error\":\"Location is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(locationRepository.findById(id), HttpStatus.OK);
	}
	
	@PostMapping("/location")
	public ResponseEntity<?> store(@RequestBody Location location,@RequestParam long itemId, @RequestParam long customerId ) throws JsonMappingException, JsonProcessingException {
		if(!itemRepository.existsById(itemId)) {
			String errorString = "{\"error\":\"Item is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		if(!customerRepository.existsById(customerId)) {
			String errorString = "{\"error\":\"Customer is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		
		Item item = itemRepository.findById(itemId);
		location.setItem(item);
		if(location.getItem().getStatus() == false) {
			String errorString = "{\"error\":\"Item has been located\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		Customer customer = customerRepository.findById(customerId);
		location.setCustomer(customer);
		location.getItem().setStatus(false);
		return new ResponseEntity<>(locationRepository.save(location), HttpStatus.OK);
	}
	
	@DeleteMapping("/location/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Location is not exists\"}";
		String successString = "{\"sucess\":\"Location has been finished\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(locationRepository.existsById(id)) {
			JsonNode successObj = mapper.readTree(successString);
			locationRepository.findById(id).getItem().setStatus(true);
			locationRepository.deleteById(id);
			return new ResponseEntity<>(successObj, HttpStatus.NO_CONTENT);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
	
	@PutMapping("/location")
	public ResponseEntity<?> update(@RequestBody Location location, @RequestParam long itemId, @RequestParam long customerId) throws JsonMappingException, JsonProcessingException{
		if(locationRepository.existsById(location.getId())) {
			if(!itemRepository.existsById(itemId)) {
				String errorString = "{\"error\":\"Item is not exists\"}";
				ObjectMapper mapper = new ObjectMapper();
				JsonNode errorObj = mapper.readTree(errorString);
				return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
			}
			if(!customerRepository.existsById(customerId)) {
				String errorString = "{\"error\":\"Customer is not exists\"}";
				ObjectMapper mapper = new ObjectMapper();
				JsonNode errorObj = mapper.readTree(errorString);
				return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
			}
			
			Item item = itemRepository.findById(itemId);
			location.setItem(item);
			Customer customer = customerRepository.findById(customerId);
			location.setCustomer(customer);
			location.getItem().setStatus(false);
			return new ResponseEntity<>(locationRepository.save(location), HttpStatus.OK);
		}
		String errorString = "{\"error\":\"Location is not exists\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
}
