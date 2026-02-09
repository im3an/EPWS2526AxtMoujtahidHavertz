package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotNull
import java.util.*

data class InvitationRequestDto (
    @NotNull val missingReportId: UUID
){
}