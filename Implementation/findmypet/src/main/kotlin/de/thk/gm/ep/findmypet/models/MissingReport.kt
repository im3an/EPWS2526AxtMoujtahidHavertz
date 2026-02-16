package de.thk.gm.ep.findmypet.models

import de.thk.gm.ep.findmypet.enums.AgeRange
import de.thk.gm.ep.findmypet.enums.PetColor
import de.thk.gm.ep.findmypet.enums.PetSize
import de.thk.gm.ep.findmypet.enums.Species
import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID


@Entity
class MissingReport(
    @Column(nullable = false)
    var petName: String,

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    var species: Species,

    var breed: String?,

    @Column(nullable = false)
    var primaryColor: PetColor,

    var colorDetails: String?,

    @Column(nullable = false)
    var petSize: PetSize,

    @Column(nullable = false)
    var ageRange: AgeRange,

    var chipNumber: String?,


    var description: String?,

    var images:String?,

    @Column(nullable = false)
    var lostDate: LocalDateTime,

    @Column(nullable = false)
    var location: Coordinate,


    @Column(nullable = false)
    var isPublic: Boolean = false,

    //True = Offen -> MissingReport ist aktuell und Haustier wird immer noch gesucht.
    //False = Geschlossen -> MissingReport ist nicht mehr aktuell und beendet. Die Suche wurde abgeschlossen.
    //Später über ENUM eventuell lösen um noch den Erfolg oder Misserfolg zeigen zu können nicht nur Offen/Geschlossen
    var status: Boolean = true,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    val owner: User,

    @OneToMany(mappedBy = "missingReport", cascade = [(CascadeType.ALL)], orphanRemoval = true)
    var areas: MutableList<Area> = mutableListOf(),

    @OneToMany(mappedBy = "missingReport", cascade = [(CascadeType.ALL)], orphanRemoval = true)
    var sightings: MutableList<Sighting> = mutableListOf(),

    @OneToMany(mappedBy = "missingReport", cascade = [(CascadeType.ALL)], orphanRemoval = true)
    var participants: MutableList<Participants> = mutableListOf()

) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null
}