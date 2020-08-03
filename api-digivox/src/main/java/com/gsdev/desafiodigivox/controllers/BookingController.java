package com.gsdev.desafiodigivox.controllers;

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
import com.gsdev.desafiodigivox.models.Booking;
import com.gsdev.desafiodigivox.models.Customer;
import com.gsdev.desafiodigivox.models.Item;
import com.gsdev.desafiodigivox.repository.BookingRepository;
import com.gsdev.desafiodigivox.repository.CustomerRepository;
import com.gsdev.desafiodigivox.repository.ItemRepository;

@RestController
@RequestMapping(value = "/api")
public class BookingController {
	@Autowired
	BookingRepository bookingRepository;
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	CustomerRepository customerRepository;
	
	@GetMapping("/booking")
	public List<Booking> index(){
		return bookingRepository.findAllByOrderByBookingDateAsc();
	}
	
	@GetMapping("/booking/{id}")
	public ResponseEntity<?> indexId(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		if(!bookingRepository.existsById(id)) {
			String errorString = "{\"error\":\"Booking is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(bookingRepository.findById(id), HttpStatus.OK);
	}
	
	@PostMapping("/booking")
	public ResponseEntity<?> store(@RequestBody Booking booking,@RequestParam long itemId, @RequestParam long customerId ) throws JsonMappingException, JsonProcessingException {
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
		booking.setItem(item);
		Customer customer = customerRepository.findById(customerId);
		booking.setCustomer(customer);
		return new ResponseEntity<>(bookingRepository.save(booking), HttpStatus.OK);
	}
	
	@DeleteMapping("/booking/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Booking is not exists\"}";
		String successString = "{\"sucess\":\"Booking has been finished\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(bookingRepository.existsById(id)) {
			JsonNode successObj = mapper.readTree(successString);
			bookingRepository.deleteById(id);
			return new ResponseEntity<>(successObj, HttpStatus.NO_CONTENT);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
	
	@PutMapping("/booking")
	public ResponseEntity<?> update(@RequestBody Booking booking, @RequestParam long itemId, @RequestParam long customerId) throws JsonMappingException, JsonProcessingException{
		if(bookingRepository.existsById(booking.getId())) {
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
			booking.setItem(item);
			Customer customer = customerRepository.findById(customerId);
			booking.setCustomer(customer);
			return new ResponseEntity<>(bookingRepository.save(booking), HttpStatus.OK);
		}
		String errorString = "{\"error\":\"Booking is not exists\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
}
