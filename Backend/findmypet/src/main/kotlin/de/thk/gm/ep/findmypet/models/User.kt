package de.thk.gm.ep.findmypet.models

import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity


@Entity
@DiscriminatorValue(value = "USER")
class User(
    name:String,
    var email: String,
    var password: String
): Account(name) { }