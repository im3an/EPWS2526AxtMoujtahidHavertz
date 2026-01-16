package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotNull
import java.time.LocalDate

open class AccountDto(
    @NotNull name: String,
    val creationDate: String = LocalDate.now().toString()
)
