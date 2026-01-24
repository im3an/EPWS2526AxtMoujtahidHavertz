package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.util.UUID


@Entity
class MissingReport(
    @Column(nullable = false)
    var petName: String,

    @Column(nullable = false)
    var location: Coordinate,

    var description: String?,
    var images:String?,

    @Column(nullable = false)
    var isPublic: Boolean = false,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    val owner: User,

    @OneToMany(mappedBy = "missingReport", cascade = [(CascadeType.ALL)], orphanRemoval = true)
    var areas: MutableList<Area> = mutableListOf(),

    @OneToMany(mappedBy = "missingReport", cascade = [(CascadeType.ALL)], orphanRemoval = true)
    var sightings: MutableList<Sighting> = mutableListOf(),

    @OneToMany(mappedBy = "missingReport", cascade = [(CascadeType.ALL)], orphanRemoval = true)
    var participants: MutableList<Participants> = mutableListOf(),

    //True = Offen -> MissingReport ist aktuell und Haustier wird immer noch gesucht.
    //False = Geschlossen -> MissingReport ist nicht mehr aktuell und beendet. Die Suche wurde abgeschlossen.
    //Später über ENUM eventuell lösen um noch den Erfolg oder Misserfolg zeigen zu können nicht nur Offen/Geschlossen
    var status: Boolean = true
) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null
}