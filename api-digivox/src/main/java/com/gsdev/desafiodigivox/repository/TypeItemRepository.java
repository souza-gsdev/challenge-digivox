package com.gsdev.desafiodigivox.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gsdev.desafiodigivox.models.TypeItem;

public interface TypeItemRepository extends JpaRepository<TypeItem, Long>{

	TypeItem findById(long id);
	
	Boolean existsByName(String name);
}
