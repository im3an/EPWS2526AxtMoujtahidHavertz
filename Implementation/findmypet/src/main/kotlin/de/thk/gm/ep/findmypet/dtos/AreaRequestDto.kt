package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.enums.Priority
import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.LocalDateTime


data class AreaRequestDto(
    val searched: Boolean = false,

    val lastSearch: LocalDateTime?,

    @field:Size(min=3, message = "Bitte mindestens 3 Koordinaten auswählen")
    @field:Valid
    val coordinates: List<CoordinateRequestDto>,

    @field:NotNull
    val priority: Priority
)