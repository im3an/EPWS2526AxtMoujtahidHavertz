package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.UserRequestDto
import de.thk.gm.ep.findmypet.dtos.UserResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto
import de.thk.gm.ep.findmypet.models.Address
import de.thk.gm.ep.findmypet.models.User
import de.thk.gm.ep.findmypet.repositories.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException
import java.util.NoSuchElementException
import java.util.UUID

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
): UserService {
    override fun getAll(): List<UserResponseDto> {
        return userRepository.findAll().toList().map { it.toResponseDto() }
    }

    override fun getById(id: UUID): UserResponseDto? {
        return userRepository.findByIdOrNull(id)?.toResponseDto()
    }

    override fun getByEmail(email: String): UserResponseDto? {
        return userRepository.findByEmail(email)?.toResponseDto()
    }

    override fun getByName(name: String): UserResponseDto? {
        return userRepository.findByName(name)?.toResponseDto()
    }

    @Transactional
    override fun save(userRequestDto: UserRequestDto): UserResponseDto {
        if (userRepository.existsByEmail(userRequestDto.email)){
            throw ResponseStatusException(HttpStatus.CONFLICT, "Diese Email ist bereits vergeben")
        }
        val user = User(
            name = userRequestDto.name,
            email = userRequestDto.email,
            password = userRequestDto.password,
            phoneNumber = userRequestDto.phoneNumber,
            surname = userRequestDto.surname,
            firstname = userRequestDto.firstname,
            address = userRequestDto.address?.let{ dto ->
                Address(
                    city = dto.city,
                    street = dto.street,
                    zipCode = dto.zipCode,
                    countryCode = dto.countryCode,
                )
            }
        )

        return userRepository.save(user).toResponseDto()
    }

    @Transactional
    override fun update(userRequestDto: UserRequestDto, userId: UUID): UserResponseDto {
        val user = userRepository.findByIdOrNull(userId) ?: throw NoSuchElementException("User with id $userId not found")
        if (user.email != userRequestDto.email && userRepository.existsByEmail(userRequestDto.email)){
            throw ResponseStatusException(HttpStatus.CONFLICT, "Diese Email ist bereits vergeben")
        }
        user.apply {
            name = userRequestDto.name
            email = userRequestDto.email
            password = userRequestDto.password
            phoneNumber = userRequestDto.phoneNumber
            surname = userRequestDto.surname
            firstname = userRequestDto.firstname
            address = userRequestDto.address?.let { dto ->
                Address(
                    street = dto.street,
                    zipCode = dto.zipCode,
                    countryCode = dto.countryCode,
                    city = dto.city,
                )
            }
        }

        return userRepository.save(user).toResponseDto()
    }

    @Transactional
    override fun delete(userId: UUID) {
        userRepository.deleteById(userId)
    }


}