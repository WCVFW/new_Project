package com.womensfoundation.service;

import com.womensfoundation.model.ContactForm;
import com.womensfoundation.model.VolunteerApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class WhatsAppService {
    
    @Value("${whatsapp.api.url:}")
    private String whatsappApiUrl;
    
    @Value("${whatsapp.api.token:}")
    private String whatsappApiToken;
    
    @Value("${whatsapp.admin.number:}")
    private String adminWhatsAppNumber;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public void sendContactNotification(ContactForm contactForm) {
        if (whatsappApiUrl.isEmpty() || adminWhatsAppNumber.isEmpty()) {
            System.out.println("WhatsApp configuration not set, skipping notification");
            return;
        }
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        String message = String.format("""
            📧 New Contact Form Submission
            
            Name: %s
            Email: %s
            Subject: %s
            
            Message: %s
            
            Time: %s
            
            Please respond promptly! 📱
            """,
            contactForm.getName(),
            contactForm.getEmail(),
            contactForm.getSubject(),
            contactForm.getMessage(),
            contactForm.getCreatedAt().format(formatter)
        );
        
        sendWhatsAppMessage(adminWhatsAppNumber, message);
    }
    
    public void sendVolunteerNotification(VolunteerApplication application) {
        if (whatsappApiUrl.isEmpty() || adminWhatsAppNumber.isEmpty()) {
            System.out.println("WhatsApp configuration not set, skipping notification");
            return;
        }
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        String message = String.format("""
            🙋‍♀️ New Volunteer Application
            
            Name: %s
            Email: %s
            Phone: %s
            Availability: %s
            
            Skills: %s
            
            Time: %s
            
            Review the application in admin panel! 💼
            """,
            application.getName(),
            application.getEmail(),
            application.getPhone() != null ? application.getPhone() : "Not provided",
            application.getAvailability() != null ? application.getAvailability() : "Not specified",
            application.getSkills() != null ? application.getSkills() : "Not provided",
            application.getCreatedAt().format(formatter)
        );
        
        sendWhatsAppMessage(adminWhatsAppNumber, message);
    }
    
    private void sendWhatsAppMessage(String phoneNumber, String message) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(whatsappApiToken);
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("to", phoneNumber);
            requestBody.put("message", message);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            restTemplate.postForEntity(whatsappApiUrl, request, String.class);
            System.out.println("WhatsApp message sent successfully to: " + phoneNumber);
            
        } catch (Exception e) {
            System.err.println("Failed to send WhatsApp message: " + e.getMessage());
        }
    }
}
