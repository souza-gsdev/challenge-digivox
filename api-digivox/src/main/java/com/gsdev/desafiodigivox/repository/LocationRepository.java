package com.gsdev.desafiodigivox.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gsdev.desafiodigivox.models.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {

	Location findById(long id);
	
	List<Location> findAllByOrderByReturnDateAsc();
	
	Location existsByItem(Long item_id);
	
	@Query("SELECT l FROM Location l WHERE l.initialDate > :startWeek and l.initialDate < :finalweek ")
	List<Location> findWeekInitial(@Param("startWeek") Date startWeek, @Param("finalweek") Date finalweek );

	@Query("SELECT l FROM Location l WHERE l.returnDate > :startWeek and l.returnDate < :finalweek ")
	List<Location> findWeekReturn(@Param("startWeek") Date startWeek, @Param("finalweek") Date finalweek );
}
