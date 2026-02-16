package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Sighting(

    @Column(nullable = false)
    var sightingDateTime: LocalDateTime,
    @Column(nullable = false)
    var location: Coordinate,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missing_report_id", nullable = false)
    val missingReport: MissingReport,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val account: Account
) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null

}