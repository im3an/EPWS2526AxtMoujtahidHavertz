package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Area
import java.time.LocalDateTime
import java.util.*

data class AreaResponseDto(
    val id: UUID,
    val searched: Boolean,
    val lastSearched: LocalDateTime?,
    val coordinates: List<CoordinateResponseDto>,
    val missingReportId: UUID,
)

fun Area.toResponseDto() = AreaResponseDto(
    id = id,
    searched = searched,
    lastSearched = lastSearched,
    coordinates = coordinates.map { it.toResponseDto() },
    missingReportId = missingReport.id
)