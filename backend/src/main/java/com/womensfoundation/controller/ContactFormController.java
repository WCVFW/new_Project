package com.womensfoundation.controller;

import com.womensfoundation.model.ContactForm;
import com.womensfoundation.service.ContactFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:3000", "https://your-frontend-domain.com"})
public class ContactFormController {
    
    @Autowired
    private ContactFormService contactFormService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContactForm(@Valid @RequestBody ContactForm contactForm) {
        try {
            ContactForm savedForm = contactFormService.saveContactForm(contactForm);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Contact form submitted successfully");
            response.put("id", savedForm.getId());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to submit contact form: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ContactForm>> getAllContactForms() {
        List<ContactForm> forms = contactFormService.getAllContactForms();
        return ResponseEntity.ok(forms);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ContactForm> getContactFormById(@PathVariable Long id) {
        return contactFormService.getContactFormById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ContactForm>> getContactFormsByStatus(@PathVariable String status) {
        List<ContactForm> forms = contactFormService.getContactFormsByStatus(status);
        return ResponseEntity.ok(forms);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<ContactForm> updateContactFormStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            ContactForm updatedForm = contactFormService.updateContactFormStatus(id, status);
            return ResponseEntity.ok(updatedForm);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteContactForm(@PathVariable Long id) {
        try {
            contactFormService.deleteContactForm(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Contact form deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete contact form");
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getContactFormStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", contactFormService.getAllContactForms().size());
        stats.put("new", contactFormService.getContactFormsCountByStatus("NEW"));
        stats.put("inProgress", contactFormService.getContactFormsCountByStatus("IN_PROGRESS"));
        stats.put("resolved", contactFormService.getContactFormsCountByStatus("RESOLVED"));
        
        return ResponseEntity.ok(stats);
    }
}
