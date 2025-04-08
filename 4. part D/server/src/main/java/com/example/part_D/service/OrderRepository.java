package com.example.part_D.service;

import com.example.part_D.model.Order;
import com.example.part_D.model.Status;
import com.example.part_D.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllBySupplierId(long supplierId);

    List<Order> findAllByStatusNot(Status status);
}
