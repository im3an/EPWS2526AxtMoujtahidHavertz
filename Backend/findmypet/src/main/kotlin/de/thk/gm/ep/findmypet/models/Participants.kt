package de.thk.gm.ep.findmypet.models

import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import java.util.UUID

@Entity
class Participants(
    @EmbeddedId
    val participantId: ParticipantsId,
    @ManyToOne
    val account: Account,
    @ManyToOne
    val missingReport: MissingReport,
    ) {
}