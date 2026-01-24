package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank

data class SingleUseRequestDto(
    @field:NotBlank (message = "Bitte einen Benutzernamen eingeben")
    override val name: String
) : AccountRequest
