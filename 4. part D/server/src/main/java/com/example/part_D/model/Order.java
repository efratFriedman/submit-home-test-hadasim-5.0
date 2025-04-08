package com.example.part_D.model;

import jakarta.persistence.*;



@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private Grocer grocer;
    @ManyToOne
    private Supplier supplier;
    @Enumerated(EnumType.STRING)
    private Status status;
    private int quantity;
    @ManyToOne
    private Stock stock;

    public Order() {
    }

    public Order(Grocer grocer, long id, int quantity, Status status, Stock stock, Supplier supplier) {
        this.grocer = grocer;
        this.id = id;
        this.quantity = quantity;
        this.status = status;
        this.stock = stock;
        this.supplier = supplier;
    }

    public Grocer getGrocer() {
        return grocer;
    }

    public void setGrocer(Grocer grocer) {
        this.grocer = grocer;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
