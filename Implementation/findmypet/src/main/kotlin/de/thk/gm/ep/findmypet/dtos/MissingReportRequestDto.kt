package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class MissingReportRequestDto(
    @NotBlank val petName: String,
    val description: String,
    @NotNull val public: Boolean,
    @NotNull val location: CoordinateRequestDto,
    @NotNull val status: Boolean = true
)