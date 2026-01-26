package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.User
import java.time.LocalDate
import java.util.*

data class UserResponseDto (
    override val id: UUID,
    override val name: String,
    override val creationDate: LocalDate,
    val email: String,
    val surname: String?,
    val firstname: String?,
    val phoneNumber: String?,
    val address: AddressResponseDto?

): AccountResponse

fun User.toResponseDto() = UserResponseDto (
    id = id!!,
    name = name,
    creationDate = creationDate,
    email = email,
    surname = surname,
    firstname = firstname,
    phoneNumber = phoneNumber,
    address = address?.toResponseDto()
)