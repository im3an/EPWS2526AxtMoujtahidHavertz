package de.thk.gm.ep.findmypet.models

import jakarta.persistence.ElementCollection
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Area(
           var searched: Boolean,
           var lastSearch: LocalDateTime?,
           @ElementCollection var coordinates: List<Coordinate>, //Eigene Klasse Coordinate erstellt um Fehler zu beheben
           @ManyToOne val missingReport: MissingReport
) {
    @Id
    val id: UUID = UUID.randomUUID()
}