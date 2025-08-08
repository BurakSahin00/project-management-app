    package stajokulu.mlipmp.business.abstracts;

import java.util.List;
import java.util.UUID;
import stajokulu.mlipmp.entities.concretes.Comment;
import stajokulu.mlipmp.entities.dto.comment.CommentSaveDto;

public interface CommentService {

    List<Comment> getCommentsByProject(UUID projectId);
    List<Comment> getCommentsByUser(UUID id);
    List<Comment> getCommentsByProjectAndUser(UUID projectId, UUID id);
    boolean deleteCommentsByProject(UUID projectId);
    boolean deleteCommentsByUser(UUID id);
    void addCommentToProject(CommentSaveDto commentSaveDto, UUID projectId);
    void updateComment(UUID commentId, String newContent);
    List<Comment> getCommentsByTask(UUID taskId); //Burak

}
