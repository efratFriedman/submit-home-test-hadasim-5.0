package com.example.part_D.service;

import com.example.part_D.model.Grocer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrocerRepository extends JpaRepository<Grocer,Long> {
    Grocer findByName(String name);
}
