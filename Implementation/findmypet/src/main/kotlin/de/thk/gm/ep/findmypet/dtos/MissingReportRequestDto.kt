package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.enums.AgeRange
import de.thk.gm.ep.findmypet.enums.PetColor
import de.thk.gm.ep.findmypet.enums.PetSize
import de.thk.gm.ep.findmypet.enums.Species
import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.PastOrPresent
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

data class MissingReportRequestDto(
    @field:NotBlank
    @field:Size(min = 2, max = 35)
    val petName: String,

    @field:NotNull
    val species: Species,

    val breed: String?,

    @field:NotNull
    val primaryColor: PetColor,

    val colorDetails: String?,

    @field:NotNull
    val petSize: PetSize,

    @field:NotNull
    val ageRange: AgeRange,

    val chipNumber: String?,

    val description: String?,

    val images: MutableList<String> = mutableListOf(),

    @field:NotNull
    @field:PastOrPresent(message = "Datum darf nicht in der Zukunft liegen")
    val lostDate: LocalDateTime,

    @field:NotNull
    @field:Valid
    val location: CoordinateRequestDto,

    @field:NotNull
    val isPublic: Boolean = false,

    @field:NotNull
    val status: Boolean = true,

)