package com.example.dashboard;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "temperatur")
public class Temperature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Temp")
    private float temp;

    @Column(name = "Datum")  // Updated column name to 'Datum' to match MySQL table
    private Date date;

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getTemp() {
        return temp;
    }

    public void setTemp(float temp) {
        this.temp = temp;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}