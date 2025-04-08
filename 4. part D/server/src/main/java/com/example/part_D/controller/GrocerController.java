package com.example.part_D.controller;

import com.example.part_D.model.Grocer;
import com.example.part_D.model.Supplier;
import com.example.part_D.service.GrocerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/grocer")
public class GrocerController {
    @Autowired
    private GrocerRepository grocerRepository;
    @PostMapping("/grocerLogin")
    public ResponseEntity<Grocer> login(@RequestBody Grocer g)  {
        try {
            Grocer grocer = grocerRepository.findByName(g.getName());
            if (grocer == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            if (grocer.getPassword().equals(g.getPassword())) {
                return new ResponseEntity<>(grocer, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
