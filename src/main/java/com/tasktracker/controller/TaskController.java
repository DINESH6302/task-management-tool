package com.tasktracker.controller;

import com.tasktracker.dto.TaskRequest;
import com.tasktracker.dto.TaskResponse;
import com.tasktracker.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getAllTasks() {
        try {
            // TODO: Implement business logic to fetch all tasks
            List<TaskResponse> tasks = new ArrayList<>();
            
            ApiResponse<List<TaskResponse>> response = ApiResponse.<List<TaskResponse>>builder()
                    .success(true)
                    .message("Tasks retrieved successfully")
                    .data(tasks)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<TaskResponse>> errorResponse = ApiResponse.<List<TaskResponse>>builder()
                    .success(false)
                    .message("Failed to retrieve tasks: " + e.getMessage())
                    .data(null)
                    .build();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponse>> getTaskById(@PathVariable String id) {
        try {
            // TODO: Implement business logic to fetch task by ID
            TaskResponse task = null;
            
            if (task == null) {
                ApiResponse<TaskResponse> response = ApiResponse.<TaskResponse>builder()
                        .success(false)
                        .message("Task not found with ID: " + id)
                        .data(null)
                        .build();
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            ApiResponse<TaskResponse> response = ApiResponse.<TaskResponse>builder()
                    .success(true)
                    .message("Task retrieved successfully")
                    .data(task)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<TaskResponse> errorResponse = ApiResponse.<TaskResponse>builder()
                    .success(false)
                    .message("Failed to retrieve task: " + e.getMessage())
                    .data(null)
                    .build();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(@Valid @RequestBody TaskRequest taskRequest) {
        try {
            // TODO: Implement business logic to create new task
            TaskResponse createdTask = null;
            
            ApiResponse<TaskResponse> response = ApiResponse.<TaskResponse>builder()
                    .success(true)
                    .message("Task created successfully")
                    .data(createdTask)
                    .build();
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            ApiResponse<TaskResponse> errorResponse = ApiResponse.<TaskResponse>builder()
                    .success(false)
                    .message("Failed to create task: " + e.getMessage())
                    .data(null)
                    .build();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTask(
            @PathVariable String id, 
            @Valid @RequestBody TaskRequest taskRequest) {
        try {
            // TODO: Implement business logic to update task
            TaskResponse updatedTask = null;
            
            if (updatedTask == null) {
                ApiResponse<TaskResponse> response = ApiResponse.<TaskResponse>builder()
                        .success(false)
                        .message("Task not found with ID: " + id)
                        .data(null)
                        .build();
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            ApiResponse<TaskResponse> response = ApiResponse.<TaskResponse>builder()
                    .success(true)
                    .message("Task updated successfully")
                    .data(updatedTask)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<TaskResponse> errorResponse = ApiResponse.<TaskResponse>builder()
                    .success(false)
                    .message("Failed to update task: " + e.getMessage())
                    .data(null)
                    .build();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTask(@PathVariable String id) {
        try {
            // TODO: Implement business logic to delete task
            boolean deleted = false;
            
            if (!deleted) {
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                        .success(false)
                        .message("Task not found with ID: " + id)
                        .data(null)
                        .build();
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            ApiResponse<Void> response = ApiResponse.<Void>builder()
                    .success(true)
                    .message("Task deleted successfully")
                    .data(null)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<Void> errorResponse = ApiResponse.<Void>builder()
                    .success(false)
                    .message("Failed to delete task: " + e.getMessage())
                    .data(null)
                    .build();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getTasksByStatus(@PathVariable String status) {
        try {
            // TODO: Implement business logic to fetch tasks by status
            List<TaskResponse> tasks = new ArrayList<>();
            
            ApiResponse<List<TaskResponse>> response = ApiResponse.<List<TaskResponse>>builder()
                    .success(true)
                    .message("Tasks retrieved successfully for status: " + status)
                    .data(tasks)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<TaskResponse>> errorResponse = ApiResponse.<List<TaskResponse>>builder()
                    .success(false)
                    .message("Failed to retrieve tasks by status: " + e.getMessage())
                    .data(null)
                    .build();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}