package de.thk.gm.ep.findmypet.dtos

import jakarta.persistence.ManyToOne
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime
import java.util.UUID


class AreaDto(
    @NotNull val searched: Boolean,
    val lastSearch: LocalDateTime?,
    @NotNull val coordinates: List<CoordinateDto>,
    @NotNull @ManyToOne val missingReportId: UUID
) {
}