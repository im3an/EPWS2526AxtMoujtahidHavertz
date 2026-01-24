package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Address

class AddressResponseDto(
    val street: String,
    val city: String,
    val countryCode: String,
    val zipCode: String,

)

fun Address.toResponseDto(): AddressResponseDto = AddressResponseDto(
    street = street,
    city = city,
    countryCode = countryCode,
    zipCode = zipCode
)