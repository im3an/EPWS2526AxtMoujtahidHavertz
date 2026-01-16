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
) {
    @Id val id: UUID = UUID.randomUUID()
}