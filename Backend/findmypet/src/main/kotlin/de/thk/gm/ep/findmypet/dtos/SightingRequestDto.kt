package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Coordinate
import jakarta.validation.constraints.NotNull
import java.util.*

data class SightingRequestDto(
    @NotNull val location: Coordinate,
    @NotNull val accountId: UUID
)