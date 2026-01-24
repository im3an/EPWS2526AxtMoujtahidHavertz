package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.MissingReport
import java.util.*

data class MissingReportResponseDto(
    val id: UUID,
    val petName: String,
    val location: CoordinateResponseDto,
    val description: String?,
    val images: String?,
    val isPublic: Boolean,

    //Owner nicht als Objekt weil sonst sensible Daten mitgesendet werden.
    val ownerId: UUID,
    val ownerName: String,

    //Areas
    val areas: List<AreaResponseDto>,

    //Sightings
    val sightings: List<SightingResponseDto>,

    //Participants
    val participants: List<ParticipantsShortResponseDto>,

    val status: Boolean
)

data class ParticipantsShortResponseDto(
    val accountId: UUID,
    val name: String
)

fun MissingReport.toResponseDto() = MissingReportResponseDto(
    id = id!!,
    petName = petName,
    location = location.toResponseDto(),
    description = description,
    images = images,
    isPublic = isPublic,
    ownerId = owner.id!!,
    ownerName = owner.name,
    areas = areas.map { it.toResponseDto() },
    sightings = sightings.map { it.toResponseDto() },
    participants = participants.map { participant ->
        ParticipantsShortResponseDto(
            accountId = participant.account.id!!,
            name = participant.account.name
        )
    },
    status = status
)
