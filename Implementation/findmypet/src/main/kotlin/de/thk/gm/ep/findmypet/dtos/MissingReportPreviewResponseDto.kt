package de.thk.gm.ep.findmypet.dtos

import java.util.UUID

data class MissingReportPreviewResponseDto(
    val id: UUID,
    val petName: String,
    val species: String,
    val previewImage: String,
    val distanceToUser: Double
)