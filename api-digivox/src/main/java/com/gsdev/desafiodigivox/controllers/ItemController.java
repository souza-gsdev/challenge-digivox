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
import com.gsdev.desafiodigivox.models.Item;
import com.gsdev.desafiodigivox.models.TypeItem;
import com.gsdev.desafiodigivox.repository.ItemRepository;
import com.gsdev.desafiodigivox.repository.TypeItemRepository;

@RestController
@RequestMapping(value = "/api")
public class ItemController {
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	TypeItemRepository typeItemRepository;
	
	@GetMapping("/item")
	public List<Item> index(){
		return itemRepository.findAll();
	}
	
	@GetMapping("/item/{id}")
	public ResponseEntity<?> indexId(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		if(!itemRepository.existsById(id)) {
			String errorString = "{\"error\":\"Item is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(itemRepository.findById(id), HttpStatus.OK);
	}
	
	@GetMapping("/item-free")
	public List<Item> indexFree() {
		return itemRepository.findByStatusTrue();
	}
	
	@PostMapping("/item/{type-id}")
	public ResponseEntity<?> store(@RequestBody Item item, @PathVariable(value = "type-id") long typeId ) throws JsonMappingException, JsonProcessingException {
		if(!typeItemRepository.existsById(typeId)) {
			String errorString = "{\"error\":\"Type item is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		
		if(itemRepository.existsByName(item.getName())) {
			String errorString = "{\"error\":\"Item is exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		TypeItem type = typeItemRepository.findById(typeId);
		item.setType(type);
		
		return new ResponseEntity<>(itemRepository.save(item), HttpStatus.OK);
	}
	
	@DeleteMapping("/item/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") long id) throws JsonMappingException, JsonProcessingException{
		String errorString = "{\"error\":\"Item is not exists\"}";
		String successString = "{\"sucess\":\"Item has been deleted\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(itemRepository.existsById(id)) {
			JsonNode successObj = mapper.readTree(successString);
			itemRepository.deleteById(id);
			return new ResponseEntity<>(successObj, HttpStatus.NO_CONTENT);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
	
	@PutMapping("/item/{type-id}")
	public ResponseEntity<?> update(@RequestBody Item item,  @PathVariable(value = "type-id") long typeId) throws JsonMappingException, JsonProcessingException{
		if(!typeItemRepository.existsById(typeId)) {
			String errorString = "{\"error\":\"Type item is not exists\"}";
			ObjectMapper mapper = new ObjectMapper();
			JsonNode errorObj = mapper.readTree(errorString);
			return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		}
		String errorString = "{\"error\":\"Type item is not exists\"}";
		ObjectMapper mapper = new ObjectMapper();
	    
		if(itemRepository.existsById(item.getId())) {
			TypeItem typeItem = typeItemRepository.findById(typeId);
			item.setType(typeItem);
			return new ResponseEntity<>(itemRepository.save(item), HttpStatus.OK);
		}
		JsonNode errorObj = mapper.readTree(errorString);
		return new ResponseEntity<>(errorObj, HttpStatus.BAD_REQUEST);
		
	}
}
