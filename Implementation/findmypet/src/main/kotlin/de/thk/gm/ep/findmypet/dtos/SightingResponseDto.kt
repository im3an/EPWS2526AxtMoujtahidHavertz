package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Sighting
import java.time.LocalDateTime
import java.util.*

data class SightingResponseDto(
    val id: UUID,
    val location: CoordinateResponseDto,
    val sightingDateTime: LocalDateTime,
    val accountName: String,
    val accountId: UUID
)

fun Sighting.toResponseDto() = SightingResponseDto(
    id = id!!,
    location = location.toResponseDto(),
    sightingDateTime = sightingDateTime,
    accountName = account.name,
    accountId = account.id!!,
)