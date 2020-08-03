package com.gsdev.desafiodigivox.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gsdev.desafiodigivox.models.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	Booking findById(long id);
	
	List<Booking> findAllByOrderByBookingDateAsc();
}
