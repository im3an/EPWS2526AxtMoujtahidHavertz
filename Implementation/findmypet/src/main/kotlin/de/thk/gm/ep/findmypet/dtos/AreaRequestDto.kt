package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.enums.AreaType
import de.thk.gm.ep.findmypet.enums.Priority
import jakarta.validation.Valid
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime


data class AreaRequestDto(
    @field:NotNull
    val searched: Boolean = false,

    val lastSearch: LocalDateTime?,

    val radius: Double?,

    @field:NotNull
    val areaType: AreaType,

    @field:NotEmpty
    @field:Valid
    val coordinates: List<CoordinateRequestDto>,

    @field:NotNull
    val priority: Priority = Priority.HIGH,
)