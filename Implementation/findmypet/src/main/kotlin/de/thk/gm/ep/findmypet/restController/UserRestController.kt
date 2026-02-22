package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.UserRequestDto
import de.thk.gm.ep.findmypet.dtos.UserResponseDto
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
    @ResponseStatus(HttpStatus.CREATED)
    fun saveUser(@Valid @RequestBody userRequestDto: UserRequestDto): UserResponseDto {
        return userService.save(userRequestDto)
    }

    @GetMapping
    fun getUsers(): List<UserResponseDto> {
        return userService.getAll()
    }

    @GetMapping("/{userId}")
    fun getUser(@PathVariable userId: UUID): UserResponseDto {
        return userService.getById(userId)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
    }

    @PutMapping("/{userId}")
    fun updateUser(
        @PathVariable userId: UUID,
        @Valid @RequestBody userRequestDto: UserRequestDto
    ): UserResponseDto {
        return userService.update(userRequestDto, userId)
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteUser(@PathVariable userId: UUID) {
        userService.delete(userId)
    }
}
