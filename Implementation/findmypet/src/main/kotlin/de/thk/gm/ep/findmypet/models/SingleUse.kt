package de.thk.gm.ep.findmypet.models

import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity
@DiscriminatorValue(value = "SINGLE_USE")
class SingleUse(
    name: String,
    var nr: Int ,
): Account(name)