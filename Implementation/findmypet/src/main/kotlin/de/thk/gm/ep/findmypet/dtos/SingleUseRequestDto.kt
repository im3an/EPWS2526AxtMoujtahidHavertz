package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class SingleUseRequestDto(
    @field:NotBlank (message = "Bitte einen Benutzernamen eingeben")
    @field:Size(min= 3, max = 15, message = "Der Name muss zwischen 3 und 15 Zeichen lang sein")
    override val name: String
) : AccountRequest
