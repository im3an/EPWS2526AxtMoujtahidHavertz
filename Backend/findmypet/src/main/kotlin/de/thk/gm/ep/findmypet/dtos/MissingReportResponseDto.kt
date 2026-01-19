package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.MissingReport
import java.util.*

data class MissingReportResponseDto(
    val petName: String,
    val location: CoordinateResponseDto,
    val description: String,
    val images: String?,
    val public: Boolean,
    val ownerId: UUID,
    val id: UUID
)

fun MissingReport.toResponseDto() = MissingReportResponseDto(
    petName = petName,
    location = location.toResponseDto(),
    description = description,
    images = images,
    public = public,
    ownerId = ownerId,
    id = id
)