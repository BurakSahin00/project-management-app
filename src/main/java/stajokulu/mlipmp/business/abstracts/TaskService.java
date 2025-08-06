package stajokulu.mlipmp.business.abstracts;

import java.util.List;
import java.util.UUID;

import stajokulu.mlipmp.entities.concretes.Task;
import stajokulu.mlipmp.entities.dto.task.TaskDto;
import stajokulu.mlipmp.entities.dto.task.TaskSaveDto;

public interface TaskService {

    List<Task> getAll(); //DONE
    Task getById(UUID id); //DONE
    void saveTask(TaskSaveDto taskDto); //DONE
    boolean deleteTask(UUID id); //DONE
    Task updateTask(TaskSaveDto taskDto, UUID id);//DONE
    List<TaskDto> getTasksByProjectId(UUID projectId);
    void updateTaskStatus(UUID taskId, String status);
}

