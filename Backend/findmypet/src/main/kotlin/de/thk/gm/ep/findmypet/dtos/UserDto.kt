package de.thk.gm.ep.findmypet.dtos

import jakarta.validation.constraints.NotNull
import java.time.LocalDate

class UserDto(
    @NotNull val name: String,
    @NotNull val email: String,
    @NotNull val password: String,
    creationDate: String = LocalDate.now().toString()
) : AccountDto(name, creationDate)
