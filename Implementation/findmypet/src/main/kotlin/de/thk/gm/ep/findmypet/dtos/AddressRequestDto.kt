package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotBlank

class AddressRequestDto(
    @field:NotBlank
    val street: String,
    @field:NotBlank
    val city: String,
    @field:NotBlank
    val zipCode: String,
    @field:NotBlank
    val countryCode: String = "DE"
)