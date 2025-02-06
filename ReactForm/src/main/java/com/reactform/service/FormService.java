package com.reactform.service;

import com.reactform.entity.Form;
import com.reactform.repository.FormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormService {

    @Autowired
    private FormRepository formRepository;

    public void saveForm(Form formEntity) {
        formRepository.save(formEntity);
    }
    public Iterable<Form> getAllFormData() {
        return formRepository.findAll();
    }

    public Form getFormDataById(Long id) {
        return formRepository.findById(id).orElse(null);
    }

}
