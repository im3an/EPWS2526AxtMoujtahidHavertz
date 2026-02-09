package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Coordinate

data class CoordinateResponseDto(
    val latitude: Double,
    val longitude: Double,
)

fun Coordinate.toResponseDto() = CoordinateResponseDto(
    latitude = latitude,
    longitude = longitude

)