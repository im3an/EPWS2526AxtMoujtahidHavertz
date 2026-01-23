package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank

data class UserRequestDto(
    @NotBlank override val name: String,
    @NotBlank val email: String,
    @NotBlank val password: String,
) : AccountRequest
