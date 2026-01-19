package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Sighting(

    var sightingDateTime: LocalDateTime,
    var location: Coordinate,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missing_report_id", nullable = false)
    val missingReport: MissingReport,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val account: Account
) {
    @Id
    val id: UUID = UUID.randomUUID()

}