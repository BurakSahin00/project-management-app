package stajokulu.mlipmp.business.concretes;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import stajokulu.mlipmp.business.abstracts.TaskService;
import stajokulu.mlipmp.entities.concretes.Task;
import stajokulu.mlipmp.entities.dto.task.TaskDto;
import stajokulu.mlipmp.entities.dto.task.TaskSaveDto;
import stajokulu.mlipmp.repository.*;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task getById(UUID id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public void saveTask(TaskSaveDto taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setProject(projectRepository.findById(taskDto.getProjectId()).orElse(null));
        if (taskDto.getAssigneeId() != null) {
            task.setAssignee(userRepository.findById(taskDto.getAssigneeId()).orElse(null));
        } else {
            task.setAssignee(null);
        }
        taskRepository.save(task);
    }

    @Override
    public boolean deleteTask(UUID id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Task updateTask(TaskSaveDto taskDto, UUID id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setProject(projectRepository.findById(taskDto.getProjectId()).orElse(null));
            if (taskDto.getAssigneeId() != null) {
                task.setAssignee(userRepository.findById(taskDto.getAssigneeId()).orElse(null));
            } else {
                task.setAssignee(null);
            }
            taskRepository.save(task);
        }
        return task;
    }

    @Override
    public List<TaskDto> getTasksByProjectId(UUID projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        return tasks.stream().map(task -> {
            TaskDto dto = new TaskDto();
            dto.setId(task.getId());
            dto.setTitle(task.getTitle());
            dto.setDescription(task.getDescription());
            dto.setStatus(task.getStatus());
            dto.setProjectId(task.getProject().getId());
            // Diğer alanlar eklenebilir
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void updateTaskStatus(UUID taskId, String status) {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null) {
            throw new RuntimeException("Task not found");
        }
        task.setStatus(status);
        taskRepository.save(task);
    }

}
