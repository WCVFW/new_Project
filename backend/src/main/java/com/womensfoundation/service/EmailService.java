package com.womensfoundation.service;

import com.womensfoundation.model.ContactForm;
import com.womensfoundation.model.VolunteerApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.admin.email:admin@womensfoundation.org}")
    private String adminEmail;
    
    @Value("${app.organization.name:Voice for Women Foundation}")
    private String organizationName;
    
    public void sendContactNotificationToAdmin(ContactForm contactForm) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(adminEmail);
        helper.setSubject("New Contact Form Submission: " + contactForm.getSubject());
        helper.setFrom("noreply@womensfoundation.org");
        
        String htmlContent = buildContactNotificationHtml(contactForm);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    public void sendAutoReplyToUser(ContactForm contactForm) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(contactForm.getEmail());
        helper.setSubject("Thank you for contacting " + organizationName);
        helper.setFrom("noreply@womensfoundation.org");
        
        String htmlContent = buildContactAutoReplyHtml(contactForm);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    public void sendVolunteerNotificationToAdmin(VolunteerApplication application) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(adminEmail);
        helper.setSubject("New Volunteer Application: " + application.getName());
        helper.setFrom("noreply@womensfoundation.org");
        
        String htmlContent = buildVolunteerNotificationHtml(application);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    public void sendVolunteerAutoReplyToUser(VolunteerApplication application) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(application.getEmail());
        helper.setSubject("Thank you for your volunteer application - " + organizationName);
        helper.setFrom("noreply@womensfoundation.org");
        
        String htmlContent = buildVolunteerAutoReplyHtml(application);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    private String buildContactNotificationHtml(ContactForm contactForm) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        return """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ec4899;">New Contact Form Submission</h2>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Contact Details:</h3>
                    <p><strong>Name:</strong> %s</p>
                    <p><strong>Email:</strong> %s</p>
                    <p><strong>Subject:</strong> %s</p>
                    <p><strong>Submitted:</strong> %s</p>
                </div>
                
                <div style="background: #fff; padding: 20px; border-left: 4px solid #ec4899; margin: 20px 0;">
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap;">%s</p>
                </div>
                
                <p><strong>Reply to:</strong> <a href="mailto:%s">%s</a></p>
            </div>
            """.formatted(
                contactForm.getName(),
                contactForm.getEmail(),
                contactForm.getSubject(),
                contactForm.getCreatedAt().format(formatter),
                contactForm.getMessage(),
                contactForm.getEmail(),
                contactForm.getEmail()
            );
    }
    
    private String buildContactAutoReplyHtml(ContactForm contactForm) {
        return """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ec4899;">Thank You for Reaching Out!</h2>
                <p>Dear %s,</p>
                <p>Thank you for contacting %s. We have received your message and will respond within 24-48 hours.</p>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Your Message:</h3>
                    <p><strong>Subject:</strong> %s</p>
                    <p style="white-space: pre-wrap;">%s</p>
                </div>
                
                <p>In the meantime, feel free to explore our website to learn more about our programs and impact.</p>
                
                <p>Best regards,<br>%s Team</p>
            </div>
            """.formatted(
                contactForm.getName(),
                organizationName,
                contactForm.getSubject(),
                contactForm.getMessage(),
                organizationName
            );
    }
    
    private String buildVolunteerNotificationHtml(VolunteerApplication application) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        return """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ec4899;">New Volunteer Application</h2>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Applicant Details:</h3>
                    <p><strong>Name:</strong> %s</p>
                    <p><strong>Email:</strong> %s</p>
                    <p><strong>Phone:</strong> %s</p>
                    <p><strong>Availability:</strong> %s</p>
                    <p><strong>Submitted:</strong> %s</p>
                </div>
                
                <div style="background: #fff; padding: 20px; border-left: 4px solid #ec4899; margin: 20px 0;">
                    <h3>Skills & Expertise:</h3>
                    <p style="white-space: pre-wrap;">%s</p>
                </div>
                
                <div style="background: #fff; padding: 20px; border-left: 4px solid #ec4899; margin: 20px 0;">
                    <h3>Motivation:</h3>
                    <p style="white-space: pre-wrap;">%s</p>
                </div>
                
                <div style="background: #fff; padding: 20px; border-left: 4px solid #ec4899; margin: 20px 0;">
                    <h3>Previous Experience:</h3>
                    <p style="white-space: pre-wrap;">%s</p>
                </div>
                
                <p><strong>Contact:</strong> <a href="mailto:%s">%s</a></p>
            </div>
            """.formatted(
                application.getName(),
                application.getEmail(),
                application.getPhone() != null ? application.getPhone() : "Not provided",
                application.getAvailability() != null ? application.getAvailability() : "Not specified",
                application.getCreatedAt().format(formatter),
                application.getSkills() != null ? application.getSkills() : "Not provided",
                application.getMotivation() != null ? application.getMotivation() : "Not provided",
                application.getExperience() != null ? application.getExperience() : "Not provided",
                application.getEmail(),
                application.getEmail()
            );
    }
    
    private String buildVolunteerAutoReplyHtml(VolunteerApplication application) {
        return """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ec4899;">Thank You for Your Volunteer Application!</h2>
                <p>Dear %s,</p>
                <p>Thank you for your interest in volunteering with %s. We have received your application and will review it carefully.</p>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>What's Next?</h3>
                    <ul>
                        <li>Our volunteer coordinator will review your application within 3-5 business days</li>
                        <li>If your skills match our current needs, we'll contact you for a brief interview</li>
                        <li>We'll provide orientation and training for all new volunteers</li>
                    </ul>
                </div>
                
                <p>We appreciate your commitment to empowering women and making a positive impact in our community.</p>
                
                <p>Best regards,<br>%s Volunteer Team</p>
            </div>
            """.formatted(
                application.getName(),
                organizationName,
                organizationName
            );
    }
}
