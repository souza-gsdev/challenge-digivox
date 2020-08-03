package com.gsdev.desafiodigivox.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gsdev.desafiodigivox.models.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
	
	Item findById(long id);

	Boolean existsByName(String name);
	
	List<Item> findByStatusTrue();
}
