package com.example.Backend.service;

import com.example.Backend.entity.Category;
import com.example.Backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category create(Category c) {
        return categoryRepository.save(c);
    }

    public Page<Category> getAll(int page, int size, String sortBy) {
        return categoryRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public Optional<Category> getById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category update(Long id, Category category) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(category.getName());
            return categoryRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
