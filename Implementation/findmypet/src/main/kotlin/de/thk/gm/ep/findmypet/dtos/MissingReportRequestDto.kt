package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

data class MissingReportRequestDto(
    @field:NotBlank
    @field:Size(min = 2, max = 35)
    val petName: String,

    @field:NotNull
    @field:Valid
    val location: CoordinateRequestDto,

    val description: String?,

    val images: String?,


    @field:NotNull
    val isPublic: Boolean = false,

    @field:NotNull
    val status: Boolean = true
)