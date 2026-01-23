package de.thk.gm.ep.findmypet.models

import de.thk.gm.ep.findmypet.enums.Priority
import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Area(
    var searched: Boolean,
    var lastSearched: LocalDateTime?,
    @Enumerated(EnumType.STRING)
    var priority: Priority = Priority.HIGH,

    @ElementCollection
    var coordinates: List<Coordinate>, //Eigene Klasse Coordinate erstellt um Fehler zu beheben

    @ManyToOne(fetch = FetchType.LAZY)
    val missingReport: MissingReport
) {
    @Id
    val id: UUID = UUID.randomUUID()
}