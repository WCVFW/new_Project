package com.womensfoundation.repository;

import com.womensfoundation.model.VolunteerApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VolunteerApplicationRepository extends JpaRepository<VolunteerApplication, Long> {
    
    List<VolunteerApplication> findByStatus(String status);
    
    List<VolunteerApplication> findByEmailContainingIgnoreCase(String email);
    
    @Query("SELECT v FROM VolunteerApplication v WHERE v.createdAt BETWEEN ?1 AND ?2")
    List<VolunteerApplication> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT v FROM VolunteerApplication v ORDER BY v.createdAt DESC")
    List<VolunteerApplication> findAllOrderByCreatedAtDesc();
    
    long countByStatus(String status);
    
    @Query("SELECT v FROM VolunteerApplication v WHERE v.skills LIKE %?1%")
    List<VolunteerApplication> findBySkillsContaining(String skill);
}
