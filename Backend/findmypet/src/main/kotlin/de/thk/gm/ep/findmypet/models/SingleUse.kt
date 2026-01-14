package de.thk.gm.ep.findmypet.models

import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import java.time.LocalDate
import java.util.UUID

@Entity
@DiscriminatorValue(value = "SINGLE_USE")
class SingleUse(name: String, id: UUID, val nr: Int, val creationDate: String = LocalDate.now().toString()): Account(name,id) {
}