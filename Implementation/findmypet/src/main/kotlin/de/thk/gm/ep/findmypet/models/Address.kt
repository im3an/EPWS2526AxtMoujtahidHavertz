package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Column
import jakarta.persistence.Embeddable

@Embeddable
data class Address(
    @Column(name = "street_address")
    val street: String,
    val zipCode: String,
    val city: String,

    @Column(length = 2)
    val countryCode: String = "DE",
)
