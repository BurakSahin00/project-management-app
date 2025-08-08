package stajokulu.mlipmp.business.concretes;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import stajokulu.mlipmp.business.abstracts.CommentService;
import stajokulu.mlipmp.entities.concretes.*;
import stajokulu.mlipmp.entities.dto.comment.CommentSaveDto;
import stajokulu.mlipmp.repository.CommentRepository;

import stajokulu.mlipmp.repository.TaskRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;

    @Override
    public List<Comment> getCommentsByProject(UUID projectId) {
        return commentRepository.findByTaskProjectId(projectId);
    }

    @Override
    public List<Comment> getCommentsByUser(UUID id) {
        return commentRepository.findByAuthorId(id);
    }

    @Override
    public List<Comment> getCommentsByProjectAndUser(UUID projectId, UUID userId) {
        return commentRepository.findByTaskProjectIdAndAuthorId(projectId, userId);
    }

    @Override
    public boolean deleteCommentsByProject(UUID projectId) {
        List<Comment> comments = commentRepository.findByTaskProjectId(projectId);
        if (comments.isEmpty())
            return false;

        commentRepository.deleteAll(comments);
        return true;
    }

    @Override
    public boolean deleteCommentsByUser(UUID id) {
        List<Comment> comments = commentRepository.findByAuthorId(id);
        if (comments.isEmpty())
            return false;

        commentRepository.deleteAll(comments);
        return true;
    }

    @Override
    public void addCommentToProject(CommentSaveDto commentSaveDto, UUID projectId) {
        Comment comment = new Comment();
        comment.setContent(commentSaveDto.getContent());

        Task task = taskRepository.findById(commentSaveDto.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User author = new User();
        author.setId(commentSaveDto.getAuthorId());

        comment.setTask(task);
        comment.setAuthor(author);

        commentRepository.save(comment);
    }

    @Override
    public void updateComment(UUID commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.setContent(newContent);
        commentRepository.save(comment);
    }

    //Burak
    @Override
    public List<Comment> getCommentsByTask(UUID taskId) {
        return commentRepository.findByTaskId(taskId);
    }

}
