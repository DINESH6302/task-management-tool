package com.tasktracker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public class BookmarkRequest {
    
    @NotBlank(message = "Bookmark name is required")
    @Size(min = 2, max = 100, message = "Bookmark name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "URL is required")
    @URL(message = "Please provide a valid URL")
    private String url;
    
    @NotBlank(message = "Category is required")
    @Pattern(regexp = "^(Document|Form|Video|FAQ|Tool|Social|Shopping|News)$", 
             message = "Category must be one of: Document, Form, Video, FAQ, Tool, Social, Shopping, News")
    private String category;

    // Constructors
    public BookmarkRequest() {}

    public BookmarkRequest(String name, String url, String category) {
        this.name = name;
        this.url = url;
        this.category = category;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}