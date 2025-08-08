package stajokulu.mlipmp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stajokulu.mlipmp.entities.concretes.Comment;
import stajokulu.mlipmp.entities.concretes.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    List<Comment> findByTaskProjectId(UUID projectId);
    List<Comment> findByAuthorId(UUID authorId);
    List<Comment> findByTaskProjectIdAndAuthorId(UUID projectId, UUID authorId);
    List<Comment> findByTaskId(UUID taskId); //Burak
    // Burayı düzeltin:
    Optional<Task> findFirstByTaskProjectId(UUID projectId);

}
