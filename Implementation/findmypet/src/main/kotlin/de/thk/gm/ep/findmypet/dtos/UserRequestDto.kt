package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.Valid
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class UserRequestDto(
    @field:Size(min = 2, max = 20)
    val surname: String?,

    @field:Size(min = 2, max = 30)
    val firstname: String?,

    @field:Pattern(regexp = "^\\+?[0-9\\s\\-]{7,20}$", message = "Ungültiges Telefonnummer-Format")
    val phoneNumber: String?,

    @field:Valid
    val address: AddressRequestDto?,

    @field:NotBlank
    @field:Size(min = 3, max = 15)
    override val name: String,

    @field:NotBlank
    @field:Email
    val email: String,

    @field:NotBlank
    @field:Size(min = 8, max = 35, message = "Passwort muss zwischen 8 und 35 Zeichen lang sein")
    val password: String,
) : AccountRequest
