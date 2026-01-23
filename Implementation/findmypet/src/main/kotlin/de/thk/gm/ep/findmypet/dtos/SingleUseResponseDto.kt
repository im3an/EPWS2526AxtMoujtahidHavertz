package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.SingleUse
import java.util.*

data class SingleUseResponseDto(
    override val id: UUID,
    override val creationDate: String,
    override val name: String,
    val nr: Int,
): AccountResponse


fun SingleUse.toResponseDto() = SingleUseResponseDto(
    id = id,
    creationDate = creationDate,
    name = name,
    nr = nr,
)