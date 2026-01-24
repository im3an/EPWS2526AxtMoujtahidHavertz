package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotNull

data class CoordinateRequestDto(
    @field:NotNull
    @field:DecimalMin(value = "-180.0", message = "Längengrad ungültig und muss mindestens -180.0 betragen")
    @field:DecimalMax(value = "180.0", message = "Längengrad ungültig und darf maximal 180.0 betragen")
    val longitude: Double,

    @field:NotNull
    @field:DecimalMin(value = "-90.0", message = "Breitengrad ungültig und muss mindestens -90 betragen")
    @field:DecimalMax(value = "90.0", message = "Breitengrad ungültig und darf maximal 90 betragen")
    val latitude: Double
) {
}