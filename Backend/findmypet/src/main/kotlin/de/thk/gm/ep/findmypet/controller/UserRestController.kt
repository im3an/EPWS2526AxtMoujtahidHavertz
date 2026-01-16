package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.UserDto
import de.thk.gm.ep.findmypet.models.User
import de.thk.gm.ep.findmypet.services.UserService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@RestController
@RequestMapping("/api/v1/accounts/users")
class UserRestController(
    private val userService: UserService
) {

    @PostMapping
    fun saveUser(
        @Valid @RequestBody userDto: UserDto
    ): User {
        val user = User(
            userDto.name,
            userDto.email,
            userDto.password,
        )
        return userService.save(user)
    }

    @GetMapping
    fun getUsers(): List<User> {
        return userService.getAll()
    }

    @GetMapping("/{userId}")
    fun getUser(@PathVariable("userId") userId: UUID): User {
        return userService.getById(userId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{userId}")
    fun updateUser(
        @PathVariable("userId") userId: UUID,
        @Valid @RequestBody userDto: UserDto
    ) {
        val user = userService.getById(userId)
        user?.let {
            user.name = userDto.name
            user.email = userDto.email
            user.password = userDto.password
            userService.save(user)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
    }

    @DeleteMapping("/{userId}")
    fun deleteUser(@PathVariable("userId") userId: UUID) {
        val user = userService.getById(userId)
        user?.let {
            userService.delete(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
    }
}