package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.UserRequestDto
import de.thk.gm.ep.findmypet.dtos.UserResponseDto
import java.util.UUID

interface UserService {
    fun getAll(): List<UserResponseDto>
    fun getById(id: UUID): UserResponseDto?
    fun getByEmail(email: String): UserResponseDto?
    fun getByName(name: String): UserResponseDto?
    fun save(userRequestDto: UserRequestDto): UserResponseDto
    fun update(userRequestDto: UserRequestDto, userId: UUID): UserResponseDto
    fun delete(userId: UUID)
}