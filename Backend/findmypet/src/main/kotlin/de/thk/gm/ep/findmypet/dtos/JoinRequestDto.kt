package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank

data class JoinRequestDto(
    @NotBlank val name: String,
    @NotBlank val token: String
)