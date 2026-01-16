package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.User
import org.springframework.stereotype.Service
import java.util.UUID

@Service
interface UserService {
    fun getAll(): List<User>
    fun getById(id: UUID): User?
    fun getByEmail(email: String): User?
    fun getByName(name: String): User?
    fun save(user: User): User
    fun delete(user: User)
}