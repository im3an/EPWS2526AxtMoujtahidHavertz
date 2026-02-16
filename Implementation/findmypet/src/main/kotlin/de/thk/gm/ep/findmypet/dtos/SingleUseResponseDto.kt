package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.SingleUse
import java.time.LocalDate
import java.util.*

data class SingleUseResponseDto(
    override val id: UUID,
    override val creationDate: LocalDate,
    override val name: String,
    val pin: Int,
): AccountResponse


fun SingleUse.toResponseDto() = SingleUseResponseDto(
    id = id!!,
    creationDate = creationDate,
    name = name,
    pin = pin,
)