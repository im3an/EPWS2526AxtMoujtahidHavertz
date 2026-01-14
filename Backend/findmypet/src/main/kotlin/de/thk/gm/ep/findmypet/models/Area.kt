package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Area(val searched: Boolean,
           val lastSearche: LocalDateTime?,
           val coordinates: List<Pair<Double,Double>>,/*might make some trouble*/
           @ManyToOne val missingReport: MissingReport,
           @Id val id: UUID = UUID.randomUUID() ) {
}