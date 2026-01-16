package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Coordinate
import org.jetbrains.annotations.NotNull

class MissingReportDto(
    @NotNull val petName: String,
    val description: String,
    val public: Boolean,
    @NotNull val location: Coordinate,
    val status: Boolean = true
) {


}