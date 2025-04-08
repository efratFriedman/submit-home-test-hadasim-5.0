package com.example.part_D.service;

import com.example.part_D.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {
    Supplier findByNumberPhone(String numberPhone);
}
