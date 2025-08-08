package stajokulu.mlipmp.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stajokulu.mlipmp.business.abstracts.CommentService;
import stajokulu.mlipmp.entities.concretes.Comment;
import stajokulu.mlipmp.entities.dto.comment.CommentSaveDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Comment>> getCommentsByProject(@PathVariable UUID projectId) {
        List<Comment> comments = commentService.getCommentsByProject(projectId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable UUID userId) {
        List<Comment> comments = commentService.getCommentsByUser(userId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/project/{projectId}/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByProjectAndUser(@PathVariable UUID projectId,
                                                                     @PathVariable UUID userId) {
        List<Comment> comments = commentService.getCommentsByProjectAndUser(projectId, userId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<String> deleteCommentsByProject(@PathVariable UUID projectId) {
        boolean deleted = commentService.deleteCommentsByProject(projectId);
        if (deleted) {
            return ResponseEntity.ok("Comments deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No comments found for project.");
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> deleteCommentsByUser(@PathVariable UUID userId) {
        boolean deleted = commentService.deleteCommentsByUser(userId);
        if (deleted) {
            return ResponseEntity.ok("Comments deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No comments found for user.");
        }
    }

    @PostMapping("/project/add/{projectId}")
    public ResponseEntity<Void> addComment(@RequestBody CommentSaveDto commentSaveDto, @PathVariable UUID projectId) {
        commentService.addCommentToProject(commentSaveDto, projectId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable UUID commentId,
                                                @RequestBody String newContent) {
        try {
            commentService.updateComment(commentId, newContent);
            return ResponseEntity.ok("Comment updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //Burak
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Comment>> getCommentsByTask(@PathVariable UUID taskId) {
        List<Comment> comments = commentService.getCommentsByTask(taskId);
        return ResponseEntity.ok(comments);
    }
}
