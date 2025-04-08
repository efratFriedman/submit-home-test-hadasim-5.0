package com.example.part_D.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Grocer {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String password;
    @JsonIgnore
    @OneToMany(mappedBy = "grocer")
    private List<Order> orders;

    public Grocer() {
    }

    public Grocer(long id, String name, List<Order> orders, String password) {
        this.id = id;
        this.name = name;
        this.orders = orders;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
