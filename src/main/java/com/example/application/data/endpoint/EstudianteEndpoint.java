package com.example.application.data.endpoint;

import java.util.List;

import com.example.application.data.entity.Estudiante;
import com.example.application.data.repository.IEstudianteRepositorio;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class EstudianteEndpoint {

    private IEstudianteRepositorio repo;

    public EstudianteEndpoint(IEstudianteRepositorio repo) {
        this.repo = repo;
    }

    public List<Estudiante> getEstudiantes() {
        return repo.findAll();
    }

    public Estudiante saveEstudiante(Estudiante estudiante) {
        return repo.save(estudiante);
    }

    public void deleteEstudiante(Integer idEstudiante) {
        repo.deleteById(idEstudiante);
    }

    
}
