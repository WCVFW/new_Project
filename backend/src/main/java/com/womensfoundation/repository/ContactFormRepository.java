package com.womensfoundation.repository;

import com.womensfoundation.model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactFormRepository extends JpaRepository<ContactForm, Long> {
    
    List<ContactForm> findByStatus(String status);
    
    List<ContactForm> findByEmailContainingIgnoreCase(String email);
    
    @Query("SELECT c FROM ContactForm c WHERE c.createdAt BETWEEN ?1 AND ?2")
    List<ContactForm> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT c FROM ContactForm c ORDER BY c.createdAt DESC")
    List<ContactForm> findAllOrderByCreatedAtDesc();
    
    long countByStatus(String status);
}
