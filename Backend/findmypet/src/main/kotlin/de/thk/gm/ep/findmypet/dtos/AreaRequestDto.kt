package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.enums.Priority
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.LocalDateTime


data class AreaRequestDto(
    @NotNull val searched: Boolean,
    val lastSearch: LocalDateTime?,
    @Size(min=3) val coordinates: List<CoordinateRequestDto>,
    val priority: Priority
)