package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotNull
import java.time.LocalDate

class SingleUseDto(
    @NotNull val name: String,
    @NotNull val nr: Int,
    creationDate: String = LocalDate.now().toString()
) : AccountDto(name, creationDate)
