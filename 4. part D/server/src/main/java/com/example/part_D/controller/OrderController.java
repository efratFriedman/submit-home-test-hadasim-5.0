package com.example.part_D.controller;

import com.example.part_D.model.Order;
import com.example.part_D.model.Status;
import com.example.part_D.service.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/getOrdersBySupplier/{supplierId}")
    public ResponseEntity<List<Order>> getOrdersBySupplier(@PathVariable long supplierId) {
        try{
          List<Order> ordersBySupplier=orderRepository.findAllBySupplierId(supplierId);
          return new ResponseEntity<>(ordersBySupplier, HttpStatus.OK);}
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/updateOrderStatus/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable long orderId,@RequestBody Status status) {
        try{
        Order order=orderRepository.findById(orderId).orElse(null);
        if(order!=null){
            order.setStatus(status);
            orderRepository.save(order);
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);}
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/orderingStock")
    public ResponseEntity<Order> orderingStock(@RequestBody Order order) {
        try{
            System.out.println(order);
        Order newOrder=orderRepository.save(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);}
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getOrdersNotCompleted")
    public ResponseEntity<List<Order>> getOrdersNotCompleted(){
        List<Order> ordersNotCompleted=orderRepository.findAllByStatusNot(Status.COMPLETED);
        return new ResponseEntity<>(ordersNotCompleted,HttpStatus.OK);
    }
    @GetMapping("/getAllOrders")
    public ResponseEntity<List<Order>> getAllOrders(){
        try{
            return new ResponseEntity<>(orderRepository.findAll(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
