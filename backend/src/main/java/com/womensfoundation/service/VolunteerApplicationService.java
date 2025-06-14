package com.womensfoundation.service;

import com.womensfoundation.model.VolunteerApplication;
import com.womensfoundation.repository.VolunteerApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VolunteerApplicationService {
    
    @Autowired
    private VolunteerApplicationRepository volunteerApplicationRepository;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private WhatsAppService whatsAppService;
    
    public VolunteerApplication saveVolunteerApplication(VolunteerApplication application) {
        VolunteerApplication savedApplication = volunteerApplicationRepository.save(application);
        
        // Send email notifications
        try {
            emailService.sendVolunteerNotificationToAdmin(savedApplication);
            emailService.sendVolunteerAutoReplyToUser(savedApplication);
        } catch (Exception e) {
            System.err.println("Failed to send email notifications: " + e.getMessage());
        }
        
        // Send WhatsApp notification
        try {
            whatsAppService.sendVolunteerNotification(savedApplication);
        } catch (Exception e) {
            System.err.println("Failed to send WhatsApp notification: " + e.getMessage());
        }
        
        return savedApplication;
    }
    
    public List<VolunteerApplication> getAllVolunteerApplications() {
        return volunteerApplicationRepository.findAllOrderByCreatedAtDesc();
    }
    
    public Optional<VolunteerApplication> getVolunteerApplicationById(Long id) {
        return volunteerApplicationRepository.findById(id);
    }
    
    public List<VolunteerApplication> getVolunteerApplicationsByStatus(String status) {
        return volunteerApplicationRepository.findByStatus(status);
    }
    
    public VolunteerApplication updateVolunteerApplicationStatus(Long id, String status) {
        Optional<VolunteerApplication> optionalApplication = volunteerApplicationRepository.findById(id);
        if (optionalApplication.isPresent()) {
            VolunteerApplication application = optionalApplication.get();
            application.setStatus(status);
            return volunteerApplicationRepository.save(application);
        }
        throw new RuntimeException("Volunteer application not found with id: " + id);
    }
    
    public void deleteVolunteerApplication(Long id) {
        volunteerApplicationRepository.deleteById(id);
    }
    
    public List<VolunteerApplication> getVolunteerApplicationsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return volunteerApplicationRepository.findByCreatedAtBetween(startDate, endDate);
    }
    
    public List<VolunteerApplication> getVolunteerApplicationsBySkill(String skill) {
        return volunteerApplicationRepository.findBySkillsContaining(skill);
    }
    
    public long getVolunteerApplicationsCountByStatus(String status) {
        return volunteerApplicationRepository.countByStatus(status);
    }
}
