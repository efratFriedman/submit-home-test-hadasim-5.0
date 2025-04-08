package com.example.part_D.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Supplier {
    @Id
    @GeneratedValue
    private long id;
    private String Name;
    private String password;
    private String companyName;
    private String numberPhone;
    @JsonIgnore
    @OneToMany(mappedBy = "supplier")
    private List<Stock> stocks;
    @JsonIgnore
    @OneToMany(mappedBy = "supplier")
    private List<Order> orders;


    public Supplier(String companyName, long id, String name, String numberPhone, List<Order> orders, String password, List<Stock> stocks) {
        this.companyName = companyName;
        this.id = id;
        Name = name;
        this.numberPhone = numberPhone;
        this.orders = orders;
        this.password = password;
        this.stocks = stocks;
    }

    public Supplier() {
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(List<Stock> stocks) {
        this.stocks = stocks;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}

