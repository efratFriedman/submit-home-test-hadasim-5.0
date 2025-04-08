package com.example.part_D.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Stock {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private double price;
    private int minimumPurchase;
    @ManyToOne
    private Supplier supplier;
    @JsonIgnore
    @OneToMany(mappedBy = "stock")
    private List<Order> orders;
public Stock() {}
    public Stock(long id, int minimumPurchase, String name, List<Order> orders, double price, Supplier supplier) {
        this.id = id;
        this.minimumPurchase = minimumPurchase;
        this.name = name;
        this.orders = orders;
        this.price = price;
        this.supplier = supplier;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMinimumPurchase() {
        return minimumPurchase;
    }

    public void setMinimumPurchase(int minimumPurchase) {
        this.minimumPurchase = minimumPurchase;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
