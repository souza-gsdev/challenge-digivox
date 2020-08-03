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
import com.gsdev.desafiodigivox.models.TypeItem;
import com.gsdev.desafiodigivox.repository.TypeItemRepository;

@RestController
@RequestMapping(value = "/api")
public class TypeItemController {
	
	@Autowired
	TypeItemRepository typeItemRepository;
	
	@GetMapping("/type-items")
	public List<TypeItem> index(){
		return typeItemRepository.findAll();
	}
	@GetMapping("/type-items/{id}")
	public ResponseEntity<?> indexId(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		if(!typeItemRepository.existsById(id)) {
			String errorString = "{\"error\":\"Item is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(typeItemRepository.findById(id), HttpStatus.OK);
	}
	
	@PostMapping("/type-items")
	public ResponseEntity<?> store(@RequestBody TypeItem typeItem ) throws JsonMappingException, JsonProcessingException {
		if(typeItemRepository.existsByName(typeItem.getName())) {
			String errorString = "{\"error\":\"Type item is exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(typeItemRepository.save(typeItem), HttpStatus.OK);
	}
	
	@DeleteMapping("/type-items/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Type item is not exists\"}";
		String successString = "{\"sucess\":\"Type item has been deleted\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(typeItemRepository.existsById(id)) {
			JsonNode successObj = mapper.readTree(successString);
			typeItemRepository.deleteById(id);
			return new ResponseEntity<>(successObj, HttpStatus.NO_CONTENT);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
	@PutMapping("/type-items")
	public ResponseEntity<?> update(@RequestBody TypeItem typeItem) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Type item is not exists\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(typeItemRepository.existsById(typeItem.getId())) {
			return new ResponseEntity<>(typeItemRepository.save(typeItem), HttpStatus.OK);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
}
