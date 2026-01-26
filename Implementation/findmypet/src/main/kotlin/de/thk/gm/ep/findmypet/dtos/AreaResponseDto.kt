package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.enums.AreaType
import de.thk.gm.ep.findmypet.enums.Priority
import de.thk.gm.ep.findmypet.models.Area
import java.time.LocalDateTime
import java.util.*

data class AreaResponseDto(
    val id: UUID,
    val searched: Boolean,
    val lastSearch: LocalDateTime?,
    val coordinates: List<CoordinateResponseDto>,
    val missingReportId: UUID,
    val priority: Priority,
    val radius: Double?,
    val areaType: AreaType,
)

fun Area.toResponseDto() = AreaResponseDto(
    id = id!!,
    searched = searched,
    lastSearch = lastSearch,
    coordinates = coordinates.map { it.toResponseDto() },
    missingReportId = missingReport.id!!,
    priority = priority,
    radius = radius,
    areaType = areaType
)