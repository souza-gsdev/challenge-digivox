package com.gsdev.desafiodigivox.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gsdev.desafiodigivox.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	Customer findById(long id);

	Boolean existsByCpf(String cpf);
	
}
