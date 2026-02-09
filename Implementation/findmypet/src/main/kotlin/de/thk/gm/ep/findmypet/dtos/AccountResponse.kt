package de.thk.gm.ep.findmypet.dtos

import java.util.*

interface AccountResponse {
    val id: UUID
    val name: String
    val creationDate: String
}