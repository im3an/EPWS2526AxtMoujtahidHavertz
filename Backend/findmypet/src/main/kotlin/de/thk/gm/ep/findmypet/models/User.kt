package de.thk.gm.ep.findmypet.models

import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import java.util.UUID


@Entity
@DiscriminatorValue(value = "USER")
class User(name:String, id: UUID, email: String, password: String): Account(name,id) { }