package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface UserRepository: CrudRepository<User, UUID> {
    fun findByEmail(email: String): User?
    fun findByName(name: String): User?
}