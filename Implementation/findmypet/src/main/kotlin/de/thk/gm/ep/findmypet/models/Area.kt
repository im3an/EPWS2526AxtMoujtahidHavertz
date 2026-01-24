package de.thk.gm.ep.findmypet.models

import de.thk.gm.ep.findmypet.enums.Priority
import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Area(
    var searched: Boolean = false,
    var lastSearched: LocalDateTime? = null,

    @Enumerated(EnumType.STRING)
    var priority: Priority = Priority.HIGH,

    @ElementCollection
    var coordinates: List<Coordinate>, //Eigene Klasse Coordinate erstellt, um Fehler zu beheben

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missing_report_id")
    val missingReport: MissingReport
) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null
}