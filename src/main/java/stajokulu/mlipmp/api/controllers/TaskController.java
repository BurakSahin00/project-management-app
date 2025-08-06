package stajokulu.mlipmp.api.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import stajokulu.mlipmp.business.abstracts.ProjectService;
import stajokulu.mlipmp.business.abstracts.TaskService;
import stajokulu.mlipmp.business.abstracts.UserService;
import stajokulu.mlipmp.entities.concretes.Task;
import stajokulu.mlipmp.entities.dto.task.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAll();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable UUID id) {
        Task task = taskService.getById(id);
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable UUID id) {
        boolean isDeleted = taskService.deleteTask(id);
        if (isDeleted) {
            return new ResponseEntity<>("Task with id " + id + " is deleted successfully.", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Task with id " + id + " is not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveTask(@RequestBody TaskSaveDto taskDto) {
        taskService.saveTask(taskDto);
        return new ResponseEntity<>("Task created successfully", HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody TaskSaveDto taskDto, @PathVariable UUID id) {
        Task updatedTask = taskService.updateTask(taskDto, id);
        if (updatedTask != null) {
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getByProjectId/{projectId}")
    public ResponseEntity<List<TaskDto>> getTasksByProjectId(@PathVariable UUID projectId) {
        List<TaskDto> tasks = taskService.getTasksByProjectId(projectId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/updateStatus/{taskId}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable UUID taskId, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        taskService.updateTaskStatus(taskId, status);
        Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Status updated");
        return ResponseEntity.ok().body(response);
    }
}
