package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.enums.AgeRange
import de.thk.gm.ep.findmypet.enums.PetColor
import de.thk.gm.ep.findmypet.enums.PetSize
import de.thk.gm.ep.findmypet.enums.Species
import de.thk.gm.ep.findmypet.models.MissingReport
import java.time.LocalDateTime
import java.util.*

data class MissingReportResponseDto(
    val id: UUID,
    val petName: String,
    val species: Species,
    val breed: String?,
    val primaryColor: PetColor,
    val colorDetails: String?,
    val petSize: PetSize,
    val ageRange: AgeRange,
    val chipNumber: String?,
    val description: String?,
    val images: String?,
    val lostDate: LocalDateTime,
    val location: CoordinateResponseDto,
    val isPublic: Boolean,
    val status: Boolean,

    //Owner nicht als Objekt weil sonst sensible Daten mitgesendet werden.
    val ownerId: UUID,
    val ownerName: String,

    //Areas
    val areas: List<AreaResponseDto>,

    //Sightings
    val sightings: List<SightingResponseDto>,

    //Participants
    val participants: List<ParticipantsShortResponseDto>,
)

data class ParticipantsShortResponseDto(
    val accountId: UUID,
    val name: String
)

fun MissingReport.toResponseDto() = MissingReportResponseDto(
    id = id!!,
    petName = petName,
    species = species,
    breed = breed,
    primaryColor = primaryColor,
    colorDetails = colorDetails,
    petSize = petSize,
    ageRange = ageRange,
    chipNumber = chipNumber,
    description = description,
    images = images,
    lostDate = lostDate,
    location = location.toResponseDto(),
    isPublic = isPublic,
    status = status,
    ownerId = owner.id!!,
    ownerName = owner.name,
    areas = areas.map { it.toResponseDto() },
    sightings = sightings.map { it.toResponseDto() },
    participants = participants.map { participant ->
        ParticipantsShortResponseDto(
            accountId = participant.account.id!!,
            name = participant.account.name
        )
    }
)
