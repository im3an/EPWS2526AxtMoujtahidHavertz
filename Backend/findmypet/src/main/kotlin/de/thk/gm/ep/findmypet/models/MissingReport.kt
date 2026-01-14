package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.UUID

@Entity
class MissingReport(val petName: String,val location: Pair<Double, Double>,val description: String,val images:String?,val public: Boolean,val ownerId: UUID,@Id val id: UUID = UUID.randomUUID()) {
}