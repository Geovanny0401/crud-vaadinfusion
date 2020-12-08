package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.application.data.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Estudiante extends AbstractEntity {

    @NotNull
    @NotEmpty
    private String nombre;
    
    private String apellido;

}
