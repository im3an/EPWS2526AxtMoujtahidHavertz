package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Area(
    var searched: Boolean,
    var lastSearched: LocalDateTime?,

    @ElementCollection
    var coordinates: List<Coordinate>, //Eigene Klasse Coordinate erstellt um Fehler zu beheben

    @ManyToOne(fetch = FetchType.LAZY)
    val missingReport: MissingReport
) {
    @Id
    val id: UUID = UUID.randomUUID()
}