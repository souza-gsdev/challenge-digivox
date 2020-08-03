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
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gsdev.desafiodigivox.models.Customer;
import com.gsdev.desafiodigivox.repository.CustomerRepository;

@RestController
@RequestMapping(value = "/api")
public class CustomerController {
	@Autowired
	CustomerRepository customerRepository;
	
	@GetMapping("/customer")
	public List<Customer> index(){
		return customerRepository.findAll();
	}
	
	@GetMapping("/customer/{id}")
	public ResponseEntity<?>  indexId(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		if(!customerRepository.existsById(id)) {
			String errorString = "{\"error\":\"Item is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(customerRepository.findById(id), HttpStatus.OK);
	}
	
	@PostMapping("/customer")
	public ResponseEntity<?> store(@RequestBody Customer customer ) throws JsonMappingException, JsonProcessingException {
		if(customerRepository.existsByCpf(customer.getCpf())) {
			String errorString = "{\"error\":\"Client is exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(customerRepository.save(customer), HttpStatus.OK);
	}
	
	@DeleteMapping("/customer/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Customer is not exists\"}";
		String successString = "{\"sucess\":\"Customer has been deleted\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(customerRepository.existsById(id)) {
			JsonNode successObj = mapper.readTree(successString);
			customerRepository.deleteById(id);
			return new ResponseEntity<>(successObj, HttpStatus.NO_CONTENT);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
	
	@PutMapping("/customer")
	public ResponseEntity<?> update(@RequestBody Customer customer) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Customer is not exists\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(customerRepository.existsById(customer.getId())) {
			return new ResponseEntity<>(customerRepository.save(customer), HttpStatus.OK);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
}
