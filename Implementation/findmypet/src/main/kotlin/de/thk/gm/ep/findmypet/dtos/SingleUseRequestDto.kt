package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank

data class SingleUseRequestDto(
    @NotBlank override val name: String,
) : AccountRequest
