package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.UUID


@Entity
class MissingReport(
    var petName: String,
    var location: Coordinate,
    var description: String,
    var images:String?,
    var public: Boolean,
    val ownerId: UUID,

    //True = Offen -> MissingReport ist aktuell und Haustier wird immer noch gesucht.
    //False = Geschlossen -> MissingReport ist nicht mehr aktuell und beendet. Die Suche wurde abgeschlossen.

    //Später über ENUM eventuell lösen um noch den Erfolg oder Misserfolg zeigen zu können nicht nur Offen/Geschlossen
    var status: Boolean
) {
    @Id val id: UUID = UUID.randomUUID()
}