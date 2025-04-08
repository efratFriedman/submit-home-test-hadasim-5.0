package com.example.part_D.controller;

import com.example.part_D.model.Supplier;
import com.example.part_D.service.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    @Autowired
    private  SupplierRepository supplierRepository;


    @PostMapping("/supplierLogin")
    public ResponseEntity<Supplier> login(@RequestBody Supplier s)  {
        try {
            Supplier supplier = supplierRepository.findByNumberPhone(s.getNumberPhone());
            if (supplier == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            if (supplier.getPassword().equals(s.getPassword())) {
                return new ResponseEntity<>(supplier, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<Supplier>SignUp(@RequestBody Supplier s){
        try {
            Supplier supplier = supplierRepository.findByNumberPhone(s.getNumberPhone());
            if (supplier == null) {
                supplierRepository.save(s);
                return new ResponseEntity<>(s, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(s, HttpStatus.CONFLICT);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
