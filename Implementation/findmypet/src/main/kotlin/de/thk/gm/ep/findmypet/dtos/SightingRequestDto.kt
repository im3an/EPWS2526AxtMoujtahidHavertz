package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.Valid
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime
import java.util.*

data class SightingRequestDto(
    @field:NotNull
    @field:Valid
    val location: CoordinateRequestDto,

    @field:NotNull
    val sightingDateTime: LocalDateTime,

    @field:NotNull
    val accountId: UUID
)