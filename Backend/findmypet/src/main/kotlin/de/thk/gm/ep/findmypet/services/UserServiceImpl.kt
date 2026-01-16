package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.User
import de.thk.gm.ep.findmypet.repositories.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
): UserService {
    override fun getAll(): List<User> {
        return userRepository.findAll().toList()
    }

    override fun getById(id: UUID): User {
        return userRepository.findById(id).orElse(null)
    }

    override fun getByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    override fun getByName(name: String): User? {
        return userRepository.findByName(name)
    }

    override fun save(user: User): User {
        return userRepository.save(user)
    }


    override fun delete(user: User) {
        userRepository.delete(user)
    }

}