package com.reactform.controller;

import com.reactform.entity.Form;
import com.reactform.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/form")
//@CrossOrigin(origins = "http://localhost:5173/") // To Allow React frontend
public class FormController {

    @Autowired
    private FormService formService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestBody Form formEntity) {
        formService.saveForm(formEntity);
        return new ResponseEntity<>("Form Submitted Successfully", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Form>> getAllFormData() {
        return new ResponseEntity<>(formService.getAllFormData(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form> getFormDataById(@PathVariable Long id) {
        Form formData = formService.getFormDataById(id);
        return formData != null ? new ResponseEntity<>(formData, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}