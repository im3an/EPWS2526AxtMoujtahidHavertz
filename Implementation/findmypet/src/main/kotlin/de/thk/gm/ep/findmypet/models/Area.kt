package de.thk.gm.ep.findmypet.models

import de.thk.gm.ep.findmypet.enums.AreaType
import de.thk.gm.ep.findmypet.enums.Priority
import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
class Area(
    var searched: Boolean = false,
    var lastSearch: LocalDateTime? = null,

    @Enumerated(EnumType.STRING)
    var areaType: AreaType,

    var radius: Double? = null,

    @Enumerated(EnumType.STRING)
    var priority: Priority = Priority.HIGH,

    @ElementCollection
    @OrderColumn(name = "coordinate_index" )
    var coordinates: MutableList<Coordinate> = mutableListOf(), //MutableList, damit Punkte einfacher und sauberer geändert werden können innerhalb der Liste (oder neue hinzugefügt / entfernt)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missing_report_id")
    val missingReport: MissingReport
) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null
}