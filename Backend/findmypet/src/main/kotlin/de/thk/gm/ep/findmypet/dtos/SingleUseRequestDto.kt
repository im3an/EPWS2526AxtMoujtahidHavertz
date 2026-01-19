package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class SingleUseRequestDto(
    @NotBlank override val name: String,
    @NotNull val nr: Int,
) : AccountRequest
