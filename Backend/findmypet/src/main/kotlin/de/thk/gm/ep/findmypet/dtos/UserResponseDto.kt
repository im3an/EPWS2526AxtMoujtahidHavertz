package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.User
import java.util.*

data class UserResponseDto (
    override val id: UUID,
    override val name: String,
    override val creationDate: String,
    val email: String

): AccountResponse

fun User.toResponseDto() = UserResponseDto (
    id = id,
    name = name,
    creationDate = creationDate,
    email = email
)