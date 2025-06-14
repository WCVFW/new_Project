package com.womensfoundation.controller;

import com.womensfoundation.model.VolunteerApplication;
import com.womensfoundation.service.VolunteerApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/volunteer")
@CrossOrigin(origins = {"http://localhost:3000", "https://your-frontend-domain.com"})
public class VolunteerApplicationController {
    
    @Autowired
    private VolunteerApplicationService volunteerApplicationService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitVolunteerApplication(@Valid @RequestBody VolunteerApplication application) {
        try {
            VolunteerApplication savedApplication = volunteerApplicationService.saveVolunteerApplication(application);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Volunteer application submitted successfully");
            response.put("id", savedApplication.getId());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to submit volunteer application: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<VolunteerApplication>> getAllVolunteerApplications() {
        List<VolunteerApplication> applications = volunteerApplicationService.getAllVolunteerApplications();
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VolunteerApplication> getVolunteerApplicationById(@PathVariable Long id) {
        return volunteerApplicationService.getVolunteerApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<VolunteerApplication>> getVolunteerApplicationsByStatus(@PathVariable String status) {
        List<VolunteerApplication> applications = volunteerApplicationService.getVolunteerApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<VolunteerApplication> updateVolunteerApplicationStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            VolunteerApplication updatedApplication = volunteerApplicationService.updateVolunteerApplicationStatus(id, status);
            return ResponseEntity.ok(updatedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteVolunteerApplication(@PathVariable Long id) {
        try {
            volunteerApplicationService.deleteVolunteerApplication(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Volunteer application deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete volunteer application");
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getVolunteerApplicationStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", volunteerApplicationService.getAllVolunteerApplications().size());
        stats.put("pending", volunteerApplicationService.getVolunteerApplicationsCountByStatus("PENDING"));
        stats.put("approved", volunteerApplicationService.getVolunteerApplicationsCountByStatus("APPROVED"));
        stats.put("rejected", volunteerApplicationService.getVolunteerApplicationsCountByStatus("REJECTED"));
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/skills/{skill}")
    public ResponseEntity<List<VolunteerApplication>> getVolunteerApplicationsBySkill(@PathVariable String skill) {
        List<VolunteerApplication> applications = volunteerApplicationService.getVolunteerApplicationsBySkill(skill);
        return ResponseEntity.ok(applications);
    }
}
