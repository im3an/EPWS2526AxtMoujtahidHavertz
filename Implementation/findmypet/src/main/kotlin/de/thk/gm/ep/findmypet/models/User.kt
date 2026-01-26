package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity


@Entity
@DiscriminatorValue(value = "USER")
class User(
    var surname: String?,
    var firstname: String?,

    //name wird zum Einloggen verwendet.
    name:String,
    @Column(unique = true, nullable = false)
    var email: String,
    @Column(nullable = false)
    var password: String,
    var phoneNumber: String? = null,
    var address: Address? = null
): Account(name)