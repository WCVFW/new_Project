package com.womensfoundation.service;

import com.womensfoundation.model.ContactForm;
import com.womensfoundation.repository.ContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactFormService {
    
    @Autowired
    private ContactFormRepository contactFormRepository;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private WhatsAppService whatsAppService;
    
    public ContactForm saveContactForm(ContactForm contactForm) {
        ContactForm savedForm = contactFormRepository.save(contactForm);
        
        // Send email notifications
        try {
            emailService.sendContactNotificationToAdmin(savedForm);
            emailService.sendAutoReplyToUser(savedForm);
        } catch (Exception e) {
            System.err.println("Failed to send email notifications: " + e.getMessage());
        }
        
        // Send WhatsApp notification
        try {
            whatsAppService.sendContactNotification(savedForm);
        } catch (Exception e) {
            System.err.println("Failed to send WhatsApp notification: " + e.getMessage());
        }
        
        return savedForm;
    }
    
    public List<ContactForm> getAllContactForms() {
        return contactFormRepository.findAllOrderByCreatedAtDesc();
    }
    
    public Optional<ContactForm> getContactFormById(Long id) {
        return contactFormRepository.findById(id);
    }
    
    public List<ContactForm> getContactFormsByStatus(String status) {
        return contactFormRepository.findByStatus(status);
    }
    
    public ContactForm updateContactFormStatus(Long id, String status) {
        Optional<ContactForm> optionalForm = contactFormRepository.findById(id);
        if (optionalForm.isPresent()) {
            ContactForm form = optionalForm.get();
            form.setStatus(status);
            return contactFormRepository.save(form);
        }
        throw new RuntimeException("Contact form not found with id: " + id);
    }
    
    public void deleteContactForm(Long id) {
        contactFormRepository.deleteById(id);
    }
    
    public List<ContactForm> getContactFormsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return contactFormRepository.findByCreatedAtBetween(startDate, endDate);
    }
    
    public long getContactFormsCountByStatus(String status) {
        return contactFormRepository.countByStatus(status);
    }
}
