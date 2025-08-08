package stajokulu.mlipmp.business.abstracts;

import stajokulu.mlipmp.entities.concretes.User;
import stajokulu.mlipmp.entities.dto.user.UserDto;
import stajokulu.mlipmp.entities.dto.user.GetUserDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

    List<GetUserDto> getAll(); //DONE
    GetUserDto getById(UUID id); //DONE
    User saveUser(UserDto userSaveDto); //DONE
    boolean deleteUser(UUID id); // DONE
    void updateUser(GetUserDto getUserDto); //DONE
    GetUserDto getUserByEmail(stajokulu.mlipmp.entities.dto.user.LoginDto loginDto);
}
