package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.util.UUID

@Entity
class Participants(
    @EmbeddedId
    val participantId: ParticipantsId,

    @ManyToOne
    @MapsId("accountId")
    @JoinColumn(name = "account_id")
    val account: Account,

    @ManyToOne
    @MapsId("reportId")
    @JoinColumn(name = "report_id")
    val missingReport: MissingReport,
    ) {
}