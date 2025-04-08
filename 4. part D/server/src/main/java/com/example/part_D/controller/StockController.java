package com.example.part_D.controller;

import com.example.part_D.model.Stock;
import com.example.part_D.service.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/stock")
public class StockController {
    @Autowired
    private StockRepository stockRepository;

    @GetMapping("/getAllStocks")
    public ResponseEntity<List<Stock>> getAllStocks(){
        try{
            return new ResponseEntity<>(stockRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/addListStocks")
    public ResponseEntity<List<Stock>> addListStocks(@RequestBody List<Stock> stocks){
        try{
            List<Stock> s=stockRepository.saveAll(stocks);
            return new ResponseEntity<>(s,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
